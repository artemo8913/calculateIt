import type { FC } from "react";

import style from "./Button.module.css";

type ButtonProps = {
  label: string;
  handleClick?: () => void;
};

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.handleClick} className={style.Button} title={props.label} type="button">
      {props.label}
    </button>
  );
};
