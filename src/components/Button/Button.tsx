import React, { MouseEventHandler } from "react";
import "./button.css";

type BtnProps = {
  text: string;
  btnType?: "button" | "submit" | "reset";
  onclick?: MouseEventHandler<HTMLButtonElement>;
};

function Button(props: BtnProps) {
  return (
    <button type={props.btnType} onClick={props.onclick}>
      <span className="button_top">{props.text}</span>
    </button>
  );
}

export default Button;
