import { useContext } from "react";
import { Background } from "../Background";
import { Modal } from "../Modal";
import css from "./GenderSelect.module.scss";
import { GenderContext } from "~/context";
type Props = {
  hide: boolean;
};

export const GenderSelect = ({ hide }: Props) => {
  const [gender, setGender] = useContext(GenderContext);
  return (
    <div className={`${css.container} ${hide ? css.hide : ""}`}>
      <Background />
      <div className={css.wrapper}>
        <h1>Санал өгөх</h1>
        <div className={css.modals}>
          <Modal text="Эрэгтэй" onClick={() => setGender("male")} />
          <Modal text="Эмэгтэй" onClick={() => setGender("female")} />
        </div>
      </div>
    </div>
  );
};
