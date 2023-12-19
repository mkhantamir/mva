import Image from "next/image";
import logo from "@mva/assets/logo-full.svg";
import css from "./Navbar.module.scss";
import { Button, errorHandler } from "@mva/shared";
import { useContext, useState } from "react";
import {
  GenderContext,
  SelectedPlayersContext,
  ShowSubmitContext,
} from "~/context";
import { toast } from "react-toastify";
import { logout } from "@mva/fetch";
import { Sidebar } from "../Sidebar";
type Props = {
  hideShare?: boolean;
};

export const Navbar = ({ hideShare }: Props) => {
  const [showSubmit, setShowSubmit] = useContext(ShowSubmitContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [gender, setGender] = useContext(GenderContext);
  const [selectedPlayers, setSelectedPlayers] = useContext(
    SelectedPlayersContext
  );
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
    <>
      <div className={css.container}>
        <Image className={css.logo} src={logo} alt="MVA - All star 2023" />
        {gender ? (
          <div className={css.hamburger} onClick={() => setShowSidebar(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : null}
        <div className={css.share}>
          {gender ? (
            <p
              onClick={() => {
                setGender(null);
                setSelectedPlayers([]);
                setShowSubmit(false);
              }}
            >
              Буцах
            </p>
          ) : !hideShare ? (
            <p
              onClick={async () => {
                try {
                  const message = await logout();
                  toast(message);
                  window.location.reload();
                } catch (error) {
                  errorHandler(error);
                }
              }}
            >
              Системээс гарах
            </p>
          ) : null}
          {gender ? (
            <Button
              className={selectedPlayers.length !== 7 ? css.disable : undefined}
              onClick={submitVote}
            >
              Санал өгөх
            </Button>
          ) : null}
        </div>
      </div>
      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        logout={async () => {
          try {
            const message = await logout();
            toast(message);
            window.location.reload();
          } catch (error) {
            errorHandler(error);
          }
        }}
      />
    </>
  );
};
