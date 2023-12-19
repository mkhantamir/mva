import { CSSProperties, ReactNode } from "react";
import css from "./Button.module.scss";
type Props = {
  id?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  style?: CSSProperties;
};

export const Button = ({
  id,
  children,
  className,
  onClick,
  type,
  style,
}: Props) => {
  return (
    <button
      style={style}
      id={id}
      className={`${css.base} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
