import { ShareWrapper } from "~/views/share";
import { useToJpeg } from "@hugocxl/react-to-image";
import { useContext, useEffect } from "react";
import { SelectedPlayersContext } from "~/context";
import { PlayerType } from ".";

type Props = {};

const TextPage = ({}: Props) => {
  const [selectedPlayers, setSelectedPlayers] = useContext(
    SelectedPlayersContext
  );
  const [state, convertToJpeg, ref] = useToJpeg<HTMLDivElement>({
    onSuccess: (data: any) => {
      console.log(data);
    },
    height: 1080,
    width: 1920,
    quality: 0.8,
    canvasHeight: 1080,
    canvasWidth: 1920,
  });
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
      <ShareWrapper type="portrait" ref={ref} />
      <button
        onClick={() => {
          console.log("clicked");
          convertToJpeg();
        }}
        style={{ position: "fixed", bottom: 50, left: 50 }}
      >
        click
      </button>
    </>
  );
};

export default TextPage;
