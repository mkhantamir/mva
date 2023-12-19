import { HTMLInputTypeAttribute } from "react";
import css from "./Textfield.module.scss";
type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
};

export const Textfield = ({
  value,
  onChange,
  placeholder,
  className,
  type,
}: Props) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`${css.base} ${className}`}
      placeholder={placeholder}
      type={type}
    />
  );
};
