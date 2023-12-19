import Image from "next/image";
import { Button, CDN_URL } from "@mva/shared";
import { PlayerType } from "~/pages";
import css from "./List.module.scss";
type Props = {
  list: PlayerType[];
  category: number | null;
  selectedPlayers: { player: PlayerType; position: number }[];
  onSelect: (player: PlayerType, position: number) => void;
};

export const List = ({ list, category, onSelect, selectedPlayers }: Props) => {
  return (
    <>
      {list.length === 0 ? <p className={css.none}>Тоглогч олдсонгүй</p> : null}
      {list
        .filter((item) => {
          if (
            selectedPlayers.findIndex(
              (player) => player.player === item && player.position !== category
            ) === -1
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map((player, i) => (
          <div className={css.item} key={i}>
            <div className={css.avatar}>
              <Image
                src={`${CDN_URL}/volleyball/2023/avatars/${player.avatar}`}
                alt={player.firstname}
                fill
              />
            </div>
            <div className={css.info}>
              <p>{player.team.name}</p>
              <p>
                {player.is_legioner
                  ? `${player.firstname_eng}.${
                      player.lastname_eng.split("")[0]
                    }`
                  : `${player.lastname.split("")[0]}.${player.firstname}`}
              </p>
            </div>
            <div>
              <div className={css.position}>
                <h1>{player.number}</h1>
                <div>{player.position.icon}</div>
              </div>
              <Button
                className={`${css.button} ${
                  selectedPlayers.find((item) => item.player === player)
                    ? css.button_selected
                    : ""
                }`}
                onClick={() => category !== null && onSelect(player, category)}
              >
                <p>+</p>
              </Button>
            </div>
          </div>
        ))}
    </>
  );
};
