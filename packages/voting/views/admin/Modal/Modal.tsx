import { PlayerType } from "~/pages";
import css from "./Modal.module.scss";
import { useState } from "react";
import { Player } from "../Player";
type Props = {
  male: { player: PlayerType; position: number; totalVotes: number }[];
  female: { player: PlayerType; position: number; totalVotes: number }[];
  onClose: () => void;
};

export const Modal = ({ male, female, onClose }: Props) => {
  const [active, setActive] = useState<"male" | "female">("male");
  return (
    <>
      <div className={css.background} onClick={onClose}></div>
      <div className={css.container}>
        <div className={css.gender}>
          <p
            className={active === "male" ? css.gender_active : undefined}
            onClick={() => setActive("male")}
          >
            Эрэгтэй
          </p>
          <span>/</span>
          <p
            className={active === "female" ? css.gender_active : undefined}
            onClick={() => setActive("female")}
          >
            Эмэгтэй
          </p>
        </div>
        <div>
          {active === "male"
            ? male.map((player) => (
                <Player data={player.player} count={player.totalVotes} />
              ))
            : null}
          {active === "female"
            ? female.map((player) => (
                <Player data={player.player} count={player.totalVotes} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};
