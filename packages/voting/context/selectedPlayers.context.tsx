import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { PlayerType } from "~/pages";

export const SelectedPlayersContext = createContext<
  [
    { player: PlayerType; position: number }[],
    Dispatch<SetStateAction<{ player: PlayerType; position: number }[]>>
  ]
>([[], () => {}]);

export const SelectedPlayersProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<
    { player: PlayerType; position: number }[]
  >([]);
  return (
    <SelectedPlayersContext.Provider
      value={[selectedPlayers, setSelectedPlayers]}
    >
      {children}
    </SelectedPlayersContext.Provider>
  );
};
