import Image from "next/image";
import courtImage from "@mva/assets/court.svg";
import css from "./Court.module.scss";
import { Add, Player } from "~/components";
import { PlayerType } from "~/pages";
import { useContext } from "react";
import { GenderContext } from "~/context";
import { IsVotesContext } from "~/context/isvoted.contex";
import { Card } from "~/views/voted";
type Props = {
  selected: number;
  view: "large" | "side";
  selectedPlayers: { player: PlayerType; position: number }[];
  onSelect: (
    position: { label: string; id: number; index: number } | null
  ) => void;
  selectPlayer: (player: PlayerType, position: number) => void;
};

export const Court = ({
  selected,
  view,
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
      <div className={`${css.container} ${css[view]}`}>
        <Image
          src={courtImage}
          alt="MVA ALL STAR - Court"
          className={css.image}
          onClick={() => onSelect && onSelect(null)}
        />
        <div className={css.positions}>
          {[...Array(7)].map((a, i) => {
            const selectedPlayer = selectedPlayers.find(
              (item) => item.position === i
            );
            return (
              <div className={css.item}>
                {!selectedPlayer ? (
                  <Add
                    active={selected === i}
                    i={i}
                    onSelect={onSelect}
                    positions={positions}
                  />
                ) : null}
                <Player
                  data={selectedPlayer}
                  position={i}
                  active={selected === i}
                  selectPlayer={selectPlayer}
                  onSelect={onSelect}
                  positions={positions}
                />
              </div>
            );
          })}
        </div>
      </div>
      {gender && isVoted[gender] ? <Card insideCourt /> : null}
    </>
  );
};
