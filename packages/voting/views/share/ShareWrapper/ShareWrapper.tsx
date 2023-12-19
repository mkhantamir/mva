import { LegacyRef, forwardRef, useContext } from "react";
import { Background } from "../Background";
import { Court } from "../Court";
import { Head } from "../Head";
import { Landscape } from "../Landscape";
import { Players } from "../Players";
import { Title } from "../Title";
import css from "./ShareWrapper.module.scss";
import { SelectedPlayersContext } from "~/context";
type Props = {
  type: "landscape" | "portrait";
};

export const ShareWrapper = forwardRef(
  ({ type }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const [players] = useContext(SelectedPlayersContext);
    return (
      <div
        ref={ref}
        className={`${css.container} ${css[type]}`}
        style={{
          width: type === "landscape" ? 1920 : 1080,
          height: type === "landscape" ? 1080 : 1920,
        }}
      >
        {type === "landscape" ? (
          <>
            <Landscape />
            <Players type={type} players={players} />
          </>
        ) : null}
        {type === "portrait" ? (
          <>
            <Background />
            <Head />
            <Title />
            <Court />
            <Players type={type} players={players} />
          </>
        ) : null}
      </div>
    );
  }
);
