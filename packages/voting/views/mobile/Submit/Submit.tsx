import { Button } from "@mva/shared";
import css from "./Submit.module.scss";
import { useContext } from "react";
import { SelectedPlayersContext, ShowSubmitContext } from "~/context";
import { toast } from "react-toastify";
type Props = {};

export const Submit = () => {
  const [showSubmit, setShowSubmit] = useContext(ShowSubmitContext);
  const [selectedPlayers] = useContext(SelectedPlayersContext);
  const submitVote = () => {
    if (selectedPlayers.length === 7) {
      let legioners_count = 0;
      selectedPlayers.forEach((item) => {
        if (item.player.is_legioner) legioners_count++;
      });
      if (legioners_count < 2) {
        toast.warn("Заавал 2 гадаад тоглогч сонгох ёстой");
        return null;
      }
      setShowSubmit(true);
    }
  };

  return (
    <div
      className={`${css.container} ${
        selectedPlayers.length !== 7 ? css.disable : undefined
      }`}
    >
      <Button onClick={submitVote}>Санал өгөх</Button>
    </div>
  );
};
