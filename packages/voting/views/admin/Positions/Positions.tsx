import { PlayerType } from "~/pages";
import { Modal } from "../Modal";
import css from "./Positions.module.scss";
import { useState } from "react";
type Props = {
  male: { player: PlayerType; position: number; totalVotes: number }[];
  female: { player: PlayerType; position: number; totalVotes: number }[];
};

export const Positions = ({ male, female }: Props) => {
  const [position, setPosition] = useState<number | null>(null);
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
        {positions.map((item, i) => (
          <div key={i} className={css.item} onClick={() => setPosition(i)}>
            <h1>{i + 1}</h1>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      {position !== null ? (
        <Modal
          male={male.filter((item) => item.position === position)}
          female={female.filter((item) => item.position === position)}
          onClose={() => setPosition(null)}
        />
      ) : null}
    </>
  );
};
