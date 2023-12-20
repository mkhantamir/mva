import { ReactNode, useContext, useEffect, useState } from "react";
import css from "./Container.module.scss";
import { Navbar } from "../Navbar";
import { checkVoted, getMyVotes, status } from "@mva/fetch";
import { useRouter } from "next/router";
import {
  SelectedPlayersProvider,
  GenderProvider,
  ShowSubmitContext,
} from "~/context";
import { Confirm } from "~/views/voted";
import { errorHandler } from "@mva/shared";
import { IsVotesContext } from "~/context/isvoted.contex";
import { VotedPlayersContext } from "~/context/votedPlayers.context";
type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  const [votedPlayers, setVotedPlayers] = useContext(VotedPlayersContext);
  const [isVoted, setIsVoted] = useState<{ male: boolean; female: boolean }>({
    female: false,
    male: false,
  });
  const [showSubmit] = useContext(ShowSubmitContext);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        // const response = await status();
        // if (response.result && router.pathname === "/login") {
        //   router.push("/");
        // }
        // if (!response.result && router.pathname === "/") {
        //   router.push("/login");
        // }
        // if (response.result) {
        // }
        const votes: any = window.localStorage.getItem("votes");
        if (votes) {
          const is_voted = JSON.parse(votes);
          if (is_voted.male || is_voted.female) {
            setVotedPlayers({ female: is_voted.female, male: is_voted.male });
          }
          setIsVoted({
            male: is_voted.male.length > 0 ? true : false,
            female: is_voted.female.length > 0 ? true : false,
          });
        } else {
          setIsVoted({
            male: false,
            female: false,
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, []);
  return (
    <SelectedPlayersProvider>
      <IsVotesContext.Provider value={isVoted}>
        <GenderProvider>
          <Navbar hideShare={router.pathname === "/login"} />
          <div className={css.content}>{children} </div>
          {showSubmit ? <Confirm /> : null}
        </GenderProvider>
      </IsVotesContext.Provider>
    </SelectedPlayersProvider>
  );
};
