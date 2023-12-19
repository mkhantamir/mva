import Image from "next/image";
import css from "./Players.module.scss";
import { CDN_URL } from "@mva/shared";
import { PlayerType } from "~/pages";
type Props = {
  type: "landscape" | "portrait";
  players: {
    player: PlayerType;
    position: number;
  }[];
};

export const Players = ({ players, type }: Props) => {
  return (
    <div className={`${css.container} ${css[type]}`}>
      {players.map(({ player }, i) => (
        <div className={css.item} key={i}>
          <div className={css.avatar}>
            <img
              src={`${CDN_URL}/volleyball/2023/avatars/${player.avatar}`}
              alt={player.firstname}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
            <div className={css.info}>
              <p>{player.number}</p>
              <div className={css.logo}>
                <img
                  src={`${CDN_URL}/volleyball/2023/logos/png/${player.team.shortname}.png`}
                  alt={player.team.shortname}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                  }}
                />
              </div>
              <p>{player.position.icon}</p>
            </div>
          </div>
          {!player.is_legioner ? (
            <h1>
              {player.lastname.split("")[0]}.{player.firstname}
            </h1>
          ) : null}
          {player.is_legioner ? (
            <h1>
              {player.firstname_eng}.{player.lastname_eng.split("")[0]}
            </h1>
          ) : null}
        </div>
      ))}
    </div>
  );
};
