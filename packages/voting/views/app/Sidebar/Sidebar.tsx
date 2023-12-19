import { Button } from "@mva/shared";
import logo from "@mva/assets/logo-full.svg";
import css from "./Sidebar.module.scss";
import Image from "next/image";
import { useContext } from "react";
import { GenderContext, SelectedPlayersContext } from "~/context";
type Props = {
  show?: boolean;
  onClose?: () => void;
  logout?: () => void;
};

export const Sidebar = ({ show, onClose, logout }: Props) => {
  const [gender, setGender] = useContext(GenderContext);
  const [selectedPlayers, setSelectedPlayers] = useContext(
    SelectedPlayersContext
  );
  return (
    <>
      <div
        className={`${css.background} ${show ? css.background_show : ""}`}
        onClick={onClose}
      ></div>
      <div className={`${css.container} ${show ? css.container_show : ""}`}>
        <Image className={css.logo} src={logo} alt="MVA - All star 2023" />
        <Button
          onClick={() => {
            setGender("male");
            setSelectedPlayers([]);
          }}
          className={gender === "male" ? css.active : ""}
        >
          Эрэгтэй
        </Button>
        <Button
          onClick={() => {
            setGender("female");
            setSelectedPlayers([]);
          }}
          className={gender === "female" ? css.active : ""}
        >
          Эмэгтэй
        </Button>
        <Button onClick={logout}>Системээс гарах</Button>
      </div>
    </>
  );
};
