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
        const response = await status();
        if (response.result && router.pathname === "/login") {
          router.push("/");
        }
        if (!response.result && router.pathname === "/") {
          router.push("/login");
        }
        if (response.result) {
          const is_voted = await checkVoted();
          if (is_voted.male || is_voted.female) {
            const votes = await getMyVotes();
            const male = votes
              .filter((vote: any) => vote.player.sex === "male")
              .map((vote: any) => ({
                player: vote.player,
                position: vote.position_id,
              }));
            const female = votes
              .filter((vote: any) => vote.player.sex === "female")
              .map((vote: any) => ({
                player: vote.player,
                position: vote.position_id,
              }));
            setVotedPlayers({ female, male });
          }
          setIsVoted(is_voted);
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
