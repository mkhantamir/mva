import { useEffect, useState } from "react";
import { getAllPositions } from "@mva/fetch";
import css from "./Position.module.scss";
type Props = {};

export const Position = ({}: Props) => {
  const [data, setData] = useState<
    { label: string; icon: string; _id: number }[]
  >([]);
  useEffect(() => {
    (async () => {
      const data = await getAllPositions();
      setData(data);
    })();
  }, []);
  return (
    <div className={css.container}>
      {data.map((item, i) => (
        <div className={css.item} key={i}>
          <div className={css.icon}></div>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};
