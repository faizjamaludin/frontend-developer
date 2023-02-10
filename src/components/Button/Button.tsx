import React from "react";
import "./button.css";

type BtnProps = {
  text: string;
}

function Button(props: BtnProps) {
  return (
    <button type="submit">
      <span className="button_top">{props.text}</span>
    </button>
  );
}

export default Button;
