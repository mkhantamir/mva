import background from "@mva/assets/share-landscape.png";
import css from "./Landscape.module.scss";
import Image from "next/image";
type Props = {};

export const Landscape = ({}: Props) => {
  return (
    <div className={css.container}>
      <Image
        src={background}
        alt="Би дээрх тоглогчдыг “All Star” дээр хармаар байна.
Та ч бас доорх  холбоосоор саналаа өгөх боломжтой"
      />
    </div>
  );
};
