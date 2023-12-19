import { ReactNode, useEffect, useState } from "react";
import css from "./Select.module.scss";
import { Option } from "~/utils";

type Props = {
  containerClassName?: string;
  selected?: Option;
  options: Option[];
  onSelect?: (value: Option) => void;
  onOpen?: () => void;
  count?: number;
};

export const Select = ({
  containerClassName = "",
  selected,
  options,
  onSelect,
  onOpen,
  count,
}: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (count) {
      setOpen(false);
    }
  }, [count]);
  return (
    <>
      <div className={`${css.container} ${containerClassName}`}>
        <div
          className={css.selected}
          onClick={() =>
            setOpen((state) => {
              if (!state && onOpen) onOpen();
              return !state;
            })
          }
        >
          <div className={css.option}>
            {selected ? selected.label : options[0].label}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className={css.selected_overlay}></div>
        </div>
        <div className={`${css.options} ${open ? css.options_show : ""}`}>
          {options.map((option, key) => (
            <div
              key={key}
              className={css.option}
              onClick={() => {
                onSelect && onSelect(option);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
