import mva from "@mva/assets/mva.svg";
import logo from "@mva/assets/logo-vertical.svg";
import ave from "@mva/assets/ave.svg";
import css from "./Head.module.scss";
import Image from "next/image";
type Props = {};

export const Head = ({}: Props) => {
  return (
    <div className={css.container}>
      <Image src={mva} alt="MVA" />
      <Image src={logo} alt="Дээд лиг - All star" />
      <Image src={ave} alt="AVE" />
    </div>
  );
};
