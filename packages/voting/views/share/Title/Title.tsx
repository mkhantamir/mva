import background from "@mva/assets/share-title.svg";
import text from "@mva/assets/share-title-text.svg";
import css from "./Title.module.scss";
import Image from "next/image";
type Props = {};

export const Title = ({}: Props) => {
  return (
    <div className={css.container}>
      <Image src={background} alt="ALL Star - Share it" />
      <Image src={text} alt="ALL Star - Хуваалцах" />
      <Image src={text} alt="ALL Star - Хуваалцах" />
    </div>
  );
};
