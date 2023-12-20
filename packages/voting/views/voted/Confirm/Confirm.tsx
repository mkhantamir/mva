import { toJpeg } from "html-to-image";
import css from "./Confirm.module.scss";
import { ShareWrapper } from "~/views/share";
import { useContext, useRef, useState } from "react";
import { Card } from "..";
import { checkImage, uploadImage, vote } from "@mva/fetch";
import {
  GenderContext,
  SelectedPlayersContext,
  ShowSubmitContext,
} from "~/context";
import { errorHandler } from "@mva/shared";
import { toast } from "react-toastify";
type Props = {};

export const Confirm = ({}: Props) => {
  const [showSubmit, setShowSubmit] = useContext(ShowSubmitContext);
  const [loading, setLoading] = useState(false);
  const [selectedPlayers] = useContext(SelectedPlayersContext);
  const [gender] = useContext(GenderContext);
  const refH = useRef<HTMLDivElement>(null);
  const refV = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  const submitVote = async () => {
    try {
      setLoading(true);
      if (gender) {
        let votes: any = window.localStorage.getItem("votes");
        if (votes) {
          votes = JSON.parse(votes);
        } else {
          votes = { male: [], female: [] };
        }
        if (votes[gender].length > 0) {
          toast.error("Нэг л санал өгөх боломжтой!");
          return 0;
        }
        votes[gender] = selectedPlayers;
        window.localStorage.setItem("votes", JSON.stringify(votes));
      }
      if (gender) {
        await vote(
          selectedPlayers.map(({ player, position }) => ({
            player_id: player._id,
            position_id: position,
          })),
          gender
        );
      }
      if (refH.current) {
        let name = "h";
        name = name + "&" + gender;
        selectedPlayers
          .sort((a, b) => a.position - b.position)
          .forEach(({ player }) => {
            name = name + "&" + `${player.team.shortname}-${player.number}`;
          });
        const result = await checkImage(name);
        if (!result) {
          try {
            const url = await toJpeg(refH.current, {
              width: 1920,
              height: 1080,
              quality: 0.8,
              canvasWidth: 1920,
              canvasHeight: 1080,
              cacheBust: false,
            });
            console.log(refH.current, url);
            await uploadImage({ base64: url, label: name });
          } catch (error) {
            console.log("err", error);
          }
        }
      }
      if (refV.current) {
        let name = "v";
        name = name + "&" + gender;
        selectedPlayers
          .sort((a, b) => a.position - b.position)
          .forEach(({ player }) => {
            name = name + "&" + `${player.team.shortname}-${player.number}`;
          });
        const result = await checkImage(name);
        if (!result) {
          try {
            const url = await toJpeg(refV.current, {
              width: 1080,
              height: 1920,
              quality: 0.8,
              canvasWidth: 1080,
              canvasHeight: 1920,
              cacheBust: false,
            });
            console.log(refV.current, url);
            await uploadImage({ base64: url, label: name });
          } catch (error) {
            console.log("err", error);
          }
        }
      }
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
    setHide(true);
  };
  return (
    <>
      {!hide ? (
        <>
          <div className={css.background}></div>
          <div className={`${css.container} ${hide ? css.hide : false}`}>
            <h1>Саналыг баталгаажуулах уу?</h1>
            <div>
              <button onClick={() => setShowSubmit(false)}>Үгүй</button>
              <button onClick={submitVote}>Тийм</button>
            </div>
          </div>
          <div style={{ display: "none" }}>
            <ShareWrapper type="landscape" ref={refH} />
            <ShareWrapper type="portrait" ref={refV} />
          </div>
          <div className={`${css.loader} ${loading ? css.loader_show : ""}`}>
            <div></div>
          </div>{" "}
        </>
      ) : null}
      {hide ? <Card /> : null}
    </>
  );
};
