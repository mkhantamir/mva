import css from "./Add.module.scss";

type Props = {
  i: number;
  active: boolean;
  onSelect: (
    position: { label: string; id: number; index: number } | null
  ) => void;
  positions: {
    label: string;
    id: number;
  }[];
};
export const Add = ({ i, active, onSelect, positions }: Props) => {
  return (
    <div
      className={`${css.container} ${active ? css.active : ""}`}
      onClick={() => onSelect({ ...positions[i], index: i })}
    >
      <svg width="27" height="27" viewBox="0 0 27 27">
        <path d="M26.2759 9.89918L26.2759 16.9772L17.0124 16.9772L17.0124 26.6435L10.2292 26.6435L10.2292 16.9772L0.965728 16.9772L0.965728 9.89917L10.2292 9.89917L10.2292 0.232895L17.0124 0.232896L17.0124 9.89917L26.2759 9.89918Z" />
      </svg>
      <p>{positions[i].label}</p>
    </div>
  );
};
