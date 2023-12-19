import Image from "next/image";
import css from "./Players.module.scss";
import { PlayerType } from "~/pages";
import { Card } from "~/views/voted";
import { useContext } from "react";
import { IsVotesContext } from "~/context/isvoted.contex";
import { GenderContext } from "~/context";
type Props = {
  selected: number;
  selectedPlayers: { player: PlayerType; position: number }[];
  onSelect: (
    position: { label: string; id: number; index: number } | null
  ) => void;
  selectPlayer: (player: PlayerType, position: number) => void;
};

export const Players = ({
  selected,
  onSelect,
  selectedPlayers,
  selectPlayer,
}: Props) => {
  const [gender] = useContext(GenderContext);
  const isVoted = useContext(IsVotesContext);
  const positions = [
    {
      label: "Холбогч",
      id: 1574,
    },
    {
      label: "Өндрийн Довтлогч",
      id: 7454,
    },
    {
      label: "Өндрийн Довтлогч",
      id: 7454,
    },
    {
      label: "Голын хаагч",
      id: 6245,
    },
    {
      label: "Өндрийн Довтлогч",
      id: 7454,
    },
    {
      label: "Голын хаагч",
      id: 6245,
    },
    {
      label: "Чөлөөт хамгаалагч",
      id: 179,
    },
  ];
  return (
    <>
      <div className={css.container}>
        {[...Array(7)].map((a, i) => {
          const data = selectedPlayers.find((item) => item.position === i);
          return (
            <>
              {!data ? (
                <div
                  className={css.item}
                  onClick={() => onSelect({ ...positions[i], index: i })}
                >
                  <svg width="27" height="27" viewBox="0 0 27 27">
                    <path d="M26.2759 9.89918L26.2759 16.9772L17.0124 16.9772L17.0124 26.6435L10.2292 26.6435L10.2292 16.9772L0.965728 16.9772L0.965728 9.89917L10.2292 9.89917L10.2292 0.232895L17.0124 0.232896L17.0124 9.89917L26.2759 9.89918Z" />
                  </svg>
                  <p>{positions[i].label}</p>
                </div>
              ) : null}
              {data ? (
                <div
                  className={css.item}
                  key={i}
                  onClick={() => onSelect({ ...positions[i], index: i })}
                >
                  <div className={css.avatar}>
                    <Image
                      src={`https://mesa.b-cdn.net/volleyball/2023/avatars/${data.player.avatar}`}
                      alt={`${data.player.team.name} - ${data.player.firstname} ${data.player.lastname}`}
                      fill
                    />
                    <div className={css.info}>
                      <p>{data.player.number}</p>
                      <div>{data.player.position.icon}</div>
                    </div>
                    <div
                      className={css.remove}
                      onClick={() => selectPlayer(data.player, i)}
                    >
                      <svg width="27" height="27" viewBox="0 0 27 27">
                        <path d="M26.2759 9.89918L26.2759 16.9772L17.0124 16.9772L17.0124 26.6435L10.2292 26.6435L10.2292 16.9772L0.965728 16.9772L0.965728 9.89917L10.2292 9.89917L10.2292 0.232895L17.0124 0.232896L17.0124 9.89917L26.2759 9.89918Z" />
                      </svg>
                    </div>
                  </div>
                  <p>{data.player.team.name}</p>
                  {data.player.is_legioner ? (
                    <h1>
                      {data.player.firstname_eng}.
                      {data.player.lastname_eng.split("")[0]}
                    </h1>
                  ) : (
                    <h1>
                      {data.player.lastname.split("")[0]}.
                      {data.player.firstname}
                    </h1>
                  )}
                </div>
              ) : null}
            </>
          );
        })}
      </div>
      {gender && isVoted[gender] ? <Card insideCourt /> : null}
    </>
  );
};
