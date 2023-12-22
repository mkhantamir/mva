import { PlayerType } from "~/pages";
import css from "./Player.module.scss";
import Image from "next/image";
import { CDN_URL } from "@mva/shared";
type Props = {
  data: PlayerType;
  count: number;
};

export const Player = ({ data, count }: Props) => {
  console.log(data);
  return (
    <div className={css.item}>
      <div className={css.avatar}>
        <Image
          src={`${CDN_URL}/volleyball/2023/avatars/${data.avatar}`}
          alt={data.firstname}
          fill
        />
      </div>
      <div className={css.info}>
        <p>{data.team.name}</p>
        <p>
          {data.is_legioner
            ? `${data.firstname_eng}.${data.lastname_eng.split("")[0]}`
            : `${data.lastname.split("")[0]}.${data.firstname}`}
        </p>
      </div>
      <div>
        <div className={css.position}>
          <h1>{data.number}</h1>
          <p>Санал: {count}</p>
        </div>
      </div>
    </div>
  );
};
