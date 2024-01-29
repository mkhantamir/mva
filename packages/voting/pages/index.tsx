import { getAllTeams, getPlayersByCategory } from "@mva/fetch";
import { Position, Pagination, Player, Team, Button } from "@mva/shared";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { GenderContext, SelectedPlayersContext } from "~/context";
import { Sidebar } from "~/views/app/Sidebar";
import { GenderSelect } from "~/views/gender";
import { Court, Menu } from "~/views/home";
import { Players, Submit } from "~/views/mobile";

const HomePage: NextPage<Props> = ({ players, teams }) => {
  const [category, setCategory] = useState<{
    label: string;
    id: number;
    index: number;
  } | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useContext(
    SelectedPlayersContext
  );
  const [gender, setGender] = useContext(GenderContext);

  const selectPlayer = (player: PlayerType, position: number) => {
    setSelectedPlayers((state) => {
      const copy = [...state];
      if (
        copy.find(
          (item) =>
            JSON.stringify({ player, position }) === JSON.stringify(item)
        )
      ) {
        const index = copy.findIndex((item) => item.player === player);
        copy.splice(index, 1);
      } else {
        if (copy.find((item) => item.position === position)) {
          const index = copy.findIndex((item) => item.position === position);
          copy.splice(index, 1);
          copy.push({ player, position });
        } else {
          copy.push({ player, position });
        }
      }
      return copy;
    });
  };
  return (
    <div
      id="root"
      style={{
        height: !gender ? "80vh" : undefined,
        overflowY: !gender ? "hidden" : undefined,
      }}
    >
      <Court
        view={category ? "side" : "large"}
        onSelect={setCategory}
        selected={category ? category.index : -1}
        selectedPlayers={selectedPlayers}
        selectPlayer={selectPlayer}
      />
      {gender ? (
        <Menu
          players={
            category
              ? players.filter(
                  (player) =>
                    player.category_id === category.id && player.sex === gender
                )
              : players
          }
          teams={teams}
          category={category ? category.index : null}
          show={category ? true : false}
          selectedPlayers={selectedPlayers}
          selectPlayer={selectPlayer}
          onSelect={setCategory}
          sex={gender}
        />
      ) : null}
      <GenderSelect hide={gender ? true : false} />
      <Players
        onSelect={setCategory}
        selected={category ? category.index : -1}
        selectedPlayers={selectedPlayers}
        selectPlayer={selectPlayer}
      />
      <Submit />
      <Sidebar />
    </div>
  );
};

export default HomePage;

export interface PlayerType extends Player {
  team: Team;
  position: Position;
}

type Props = {
  players: PlayerType[];
  teams: Team[];
  count: number;
  pagination: Pagination;
};

export const getStaticProps = async () => {
  const players = await getPlayersByCategory({ per_page: 999 });
  const teams = await getAllTeams();
  return {
    props: {
      players: players.result,
      teams,
      count: players.count,
      pagination: players.pagination,
    },
  };
};
