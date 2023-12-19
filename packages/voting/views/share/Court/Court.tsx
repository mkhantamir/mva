import { CDN_URL } from "@mva/shared";
import css from "./Court.module.scss";
type Props = {};

export const Court = ({}: Props) => {
  return (
    <div className={css.container}>
      <img
        src={`${CDN_URL}/volleyball/2023/temp/share-description.png`}
        alt="Би дээрх тоглогчдыг “All Star” дээр хармаар байна.
Та ч бас доорх  холбоосоор саналаа өгөх боломжтой"
      />
    </div>
  );
};
