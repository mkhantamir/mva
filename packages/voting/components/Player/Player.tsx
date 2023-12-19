import { PlayerType } from "~/pages";
import css from "./Player.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CDN_URL } from "@mva/shared";

type Props = {
  data?: {
    player: PlayerType;
    position: number;
  };
  position: number;
  active: boolean;
  selectPlayer: (player: PlayerType, position: number) => void;
  onSelect: (
    position: { label: string; id: number; index: number } | null
  ) => void;
  positions: {
    label: string;
    id: number;
  }[];
};

export const Player = ({
  data,
  position,
  active,
  selectPlayer,
  onSelect,
  positions,
}: Props) => {
  const [player, setPlayer] = useState<PlayerType | null>(null);
  const [animate, setAnimate] = useState<"in" | "out" | null>(null);

  useEffect(() => {
    if (data) {
      setPlayer(data.player);
      setAnimate("in");
      setTimeout(() => {
        setAnimate(null);
      }, 300);
    } else {
      setAnimate("out");
      setTimeout(() => {
        setAnimate(null);
        setPlayer(null);
      }, 300);
    }
  }, [data]);

  if (player) {
    return (
      <div
        className={`${css.container} ${animate ? css[animate] : ""} ${
          active ? css.active : ""
        }`}
        onClick={() => onSelect({ ...positions[position], index: position })}
      >
        <div
          className={css.remove}
          onClick={() => selectPlayer(player, position)}
        >
          <svg width="27" height="27" viewBox="0 0 27 27">
            <path d="M26.2759 9.89918L26.2759 16.9772L17.0124 16.9772L17.0124 26.6435L10.2292 26.6435L10.2292 16.9772L0.965728 16.9772L0.965728 9.89917L10.2292 9.89917L10.2292 0.232895L17.0124 0.232896L17.0124 9.89917L26.2759 9.89918Z" />
          </svg>
        </div>
        <div className={css.avatar}>
          <Image
            src={`${CDN_URL}/volleyball/2023/avatars/${player.avatar}`}
            alt={`${player.team.name} - ${player.firstname} ${player.lastname}`}
            fill
          />
          <div className={css.position}>
            <h1>{player.number}</h1>
            <div>{player.position.icon}</div>
          </div>
          d
        </div>
        <div className={css.info}>
          <p>{player.team.name}</p>
          {player.is_legioner ? (
            <p>
              {player.firstname_eng}.{player.lastname_eng.split("")[0]}
            </p>
          ) : (
            <p>
              {player.lastname.split("")[0]}.{player.firstname}
            </p>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
