import { Button } from "@mva/shared";
import css from "./Modal.module.scss";
type Props = {
  text: string;
  onClick: () => void;
};

export const Modal = ({ text, onClick }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.image}></div>
      <Button onClick={onClick}>{text}</Button>
    </div>
  );
};
