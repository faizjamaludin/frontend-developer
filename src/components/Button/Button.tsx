import React, { MouseEventHandler } from "react";
import styles from "./button.module.css";

type BtnProps = {
  text: string;
  btnType?: "button" | "submit" | "reset";
  onclick?: MouseEventHandler<HTMLButtonElement>;
  styling?: string;
};

function Button(props: BtnProps) {
  return (
    <button
      className={styles.button}
      type={props.btnType}
      onClick={props.onclick}
    >
      <span className={styles.buttonTop}>{props.text}</span>
    </button>
  );
}

export default Button;
