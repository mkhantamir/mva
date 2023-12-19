import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { PlayerType } from "~/pages";

export const VotedPlayersContext = createContext<
  [
    {
      male: { player: PlayerType; position: number }[];
      female: { player: PlayerType; position: number }[];
    },
    Dispatch<
      SetStateAction<{
        male: { player: PlayerType; position: number }[];
        female: { player: PlayerType; position: number }[];
      }>
    >
  ]
>([{ male: [], female: [] }, () => {}]);

export const VotedPlayersProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [votedPlayers, setVotedlayers] = useState<{
    male: { player: PlayerType; position: number }[];
    female: { player: PlayerType; position: number }[];
  }>({ male: [], female: [] });
  return (
    <VotedPlayersContext.Provider value={[votedPlayers, setVotedlayers]}>
      {children}
    </VotedPlayersContext.Provider>
  );
};
