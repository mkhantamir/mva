import Image from "next/image";
import css from "./Team.module.scss";
import { CDN_URL } from "@mva/shared";
type Props = {};

export const Team = ({}: Props) => {
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Image
          src={`${CDN_URL}/volleyball/2023/logos/HBA.svg`}
          alt="HBA logo"
          fill
        />
      </div>
      <div className={css.info}>
        <p>ENA</p>
        <h1>Enacoree</h1>
        <p>Энагурэ</p>
      </div>
    </div>
  );
};
