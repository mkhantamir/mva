import Image from "next/image";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Button, Select, Team } from "@mva/shared";
import { PlayerType } from "~/pages";
import { List } from "..";
import magnifier from "@mva/assets/search.svg";
import css from "./Menu.module.scss";

type Props = {
  show?: boolean;
  category: number | null;
  players: PlayerType[];
  teams: Team[];
  selectedPlayers: { player: PlayerType; position: number }[];
  sex: "female" | "male";
  onSelect: (
    position: { label: string; id: number; index: number } | null
  ) => void;
  selectPlayer: (player: PlayerType, position: number) => void;
};

export const Menu = ({
  show,
  category,
  players,
  teams,
  sex,
  selectedPlayers,
  onSelect,
  selectPlayer,
}: Props) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [type, setType] = useState<"all" | "mgl" | "legioner">("all");
  const [list, setList] = useState(players);
  const [search, setSearch] = useState("");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const typeList = [
    {
      label: <p className={css.all}>Бүгд</p>,
      value: "all",
    },
    {
      label: <p className={css.all}>Монгол тоглогч</p>,
      value: "mgl",
    },
    {
      label: <p className={css.all}>Гадаад тоглогч</p>,
      value: "legioner",
    },
  ];

  const fuseOptions = {
    threshold: 0.3,
    keys: [
      "firstname",
      "lastname",
      "firstname_eng",
      "lastname_eng",
      "position",
    ],
  };

  useEffect(() => {
    if (search !== "") {
      const fuse = new Fuse(players, fuseOptions);
      let searchedList = fuse.search(search).map((e) => e.item);

      if (team)
        searchedList = searchedList.filter((item) => item.team_id === team._id);
      if (type === "legioner")
        searchedList = searchedList.filter((item) => item.is_legioner);
      if (type === "mgl")
        searchedList = searchedList.filter((item) => !item.is_legioner);
      setList(searchedList);
    } else {
      let searchedList = players;
      if (team)
        searchedList = searchedList.filter((item) => item.team_id === team._id);
      if (type === "legioner")
        searchedList = searchedList.filter((item) => item.is_legioner);
      if (type === "mgl")
        searchedList = searchedList.filter((item) => !item.is_legioner);

      setList(searchedList);
    }
  }, [team, search, players, type]);

  return (
    <>
      <div
        className={`${css.background} ${show ? css.background_show : ""}`}
        onClick={() => onSelect && onSelect(null)}
      ></div>
      <div className={`${css.container} ${show ? css.container_show : ""}`}>
        <div className={css.wrapper}>
          <div className={css.search}>
            <Image src={magnifier} alt="ALL STAR тамирчин хайх" />
            <input
              placeholder="Хайлт хийх"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={css.sort}>
            <Select
              options={[
                {
                  label: <p className={css.all}>Бүгд</p>,
                  value: -1,
                },
                ...teams
                  .filter((team) => team.type === sex)
                  .map((team) => ({
                    label: (
                      <div className={css.team}>
                        <div>
                          <Image src={team.logo} alt={team.name} fill />
                        </div>
                        <p>{team.name}</p>
                      </div>
                    ),
                    value: team._id,
                  })),
              ]}
              selected={
                team
                  ? {
                      label: (
                        <div className={css.team}>
                          <div>
                            <Image src={team.logo} alt={team.name} fill />
                          </div>
                          <p>{team.shortname}</p>
                        </div>
                      ),
                      value: team._id,
                    }
                  : undefined
              }
              onSelect={(selected) => {
                const selectedTeam = teams.find(
                  (team) => team._id === selected.value
                );
                setTeam(selectedTeam ? selectedTeam : null);
              }}
              onOpen={() => setCount2((state) => state + 1)}
              count={count1}
            />
            <Select
              options={typeList.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              selected={typeList.find((item) => item.value === type)}
              onSelect={(selected) => {
                setType(selected.value);
              }}
              onOpen={() => setCount1((state) => state + 1)}
              count={count2}
            />
          </div>
          <List
            list={list}
            selectedPlayers={selectedPlayers}
            onSelect={selectPlayer}
            category={category}
          />
          <Button
            className={`${css.close} ${
              selectedPlayers.find((item) => item.position === category)
                ? css.close_show
                : ""
            }`}
            onClick={() => onSelect && onSelect(null)}
          >
            Сонгох
          </Button>
        </div>
      </div>
    </>
  );
};
