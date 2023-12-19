import logo from "@mva/assets/logo-full.svg";
import voted from "@mva/assets/voted.svg";
import facebook from "@mva/assets/facebook.svg";
import twitter from "@mva/assets/twitter.svg";
import css from "./Card.module.scss";
import Image from "next/image";
import { saveAs } from "file-saver";
import { useContext } from "react";
import { GenderContext, SelectedPlayersContext } from "~/context";
import { VotedPlayersContext } from "~/context/votedPlayers.context";
type Props = {
  insideCourt?: boolean;
};

export const Card = ({ insideCourt }: Props) => {
  const [votedPlayers] = useContext(VotedPlayersContext);
  const [selectedPlayers] = useContext(SelectedPlayersContext);
  const [gender] = useContext(GenderContext);

  const nameGenerator = (type: "h" | "v") => {
    let name = `${type}`;
    name = name + "&" + gender;
    if (gender && votedPlayers[gender].length > 0) {
      votedPlayers[gender]
        .sort((a, b) => a.position - b.position)
        .forEach(({ player }) => {
          name = name + "&" + `${player.team.shortname}-${player.number}`;
        });
    } else {
      selectedPlayers.forEach(({ player }) => {
        name = name + "&" + `${player.team.shortname}-${player.number}`;
      });
    }
    return name;
  };
  const downloadHandler = (type: "h" | "v") => {
    const name = nameGenerator(type);
    saveAs(
      `https://mesa.b-cdn.net/volleyball/2023/share/${name}.jpeg`,
      "all-star-voting.webp"
    );
  };
  const shareFb = () => {
    const name = nameGenerator("h");
    window.open(
      "http://www.facebook.com/sharer.php?u=" +
        encodeURIComponent(
          `https://mesa.b-cdn.net/volleyball/2023/share/${name}.jpeg`
        ),
      "sharer",
      "toolbar=0,status=0,width=626,height=436"
    );
    return false;
  };
  const shareX = () => {
    const name = nameGenerator("h");

    window.open(
      "http://twitter.com/share?text=Волейболл Дээд лигийн саналаа өглөө!&url=" +
        `https://mesa.b-cdn.net/volleyball/2023/share/${encodeURIComponent(
          name
        )}.jpeg`,
      "sharer",
      "toolbar=0,status=0,width=626,height=436"
    );
    return false;
  };
  return (
    <>
      <div
        className={`${css.background} ${
          insideCourt ? css.background_inside : ""
        }`}
      ></div>
      <div
        className={`${css.container} ${
          insideCourt ? css.container_inside : ""
        }`}
      >
        <div className={css.heading}>
          <Image src={logo} alt="Дээд лиг - Санал хураалт лого" />
          <p>Санал хураалт</p>
        </div>
        <Image
          className={css.voted}
          src={voted}
          alt="Дээд лиг - Саналаа өглөө!"
        />
        <div className={css.share}>
          <div>
            <p>Хуваалцах</p>
            <Image
              onClick={shareFb}
              src={facebook}
              alt="Share your vote to Facebook"
            />
            <Image
              onClick={shareX}
              src={twitter}
              alt="Share your vote to Twitter"
            />
          </div>
          <button onClick={() => downloadHandler("h")}>
            Хэвтээ зураг татах
          </button>
          <button onClick={() => downloadHandler("v")}>
            Босоо зураг татах
          </button>
        </div>
      </div>
    </>
  );
};
