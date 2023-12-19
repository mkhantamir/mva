import image from "@mva/assets/share-background.svg";
import css from "./Background.module.scss";
import Image from "next/image";
type Props = {};

export const Background = ({}: Props) => {
  return (
    <div className={css.container}>
      <Image src={image} alt="ALL STAR - Share your vote" />
    </div>
  );
};
