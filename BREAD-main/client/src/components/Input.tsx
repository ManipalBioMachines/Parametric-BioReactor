import React, { ReactElement } from "react";
import { InputState } from "../hooks/useInputState";

interface Props {
  state: InputState;
  title: string;
}

export default function Input({ state, title }: Props): ReactElement {
  return (
    <div className="input">
      <label htmlFor={title.toLowerCase()}>{title}</label>
      <input
        type="text"
        id={title.toLowerCase()}
        value={state.value}
        onChange={state.handleChange}
        className="input"
      />
    </div>
  );
}
