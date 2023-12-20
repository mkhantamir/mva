import { ShareWrapper } from "~/views/share";
import { useContext, useEffect } from "react";
import { SelectedPlayersContext } from "~/context";
import { PlayerType } from ".";
import { domToWebp } from "modern-screenshot";

type Props = {};

const TextPage = ({}: Props) => {
  const [selectedPlayers, setSelectedPlayers] = useContext(
    SelectedPlayersContext
  );
  useEffect(() => {
    const player: PlayerType = {
      _id: 33664344,
      firstname: "Халиун",
      lastname: "Чинболд",
      firstname_eng: "Khaliun",
      lastname_eng: "Chinbold",
      number: 10,
      avatar: "da7e3d02-fdc7-4d9c-bff2-5586bba5da60-33664344.jpeg",
      sex: "female",
      position_id: 1502,
      category_id: 7454,
      is_legioner: false,
      team_id: 4029898,
      position: {
        icon: "OH",
        _id: 1502,
      },
      team: {
        _id: 4029898,
        name: "Тэнүүн-Огоо",
        name_eng: "Tenuun-Ogoo",
        shortname: "TOW",
        logo: "",
        type: "female",
        createdAt: "",
      },
    };
    const selectedPlayers = [...Array(7)].map((a, i) => ({
      player,
      position: i,
    }));
    setSelectedPlayers(selectedPlayers);
  }, []);

  return (
    <>
      <ShareWrapper type="landscape" />
      <button
        onClick={async () => {
          const result = await domToWebp(
            document.querySelector("#share-landscape") as any
          );
          console.log(result);
        }}
        style={{ position: "fixed", bottom: 50, left: 50 }}
      >
        click
      </button>
    </>
  );
};

export default TextPage;
