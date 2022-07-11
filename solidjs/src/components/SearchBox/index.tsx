import { Component } from "solid-js";
import classes from "./SearchBox.module.css";

type Props = {
  /**
   * current input
   */
  input: string;
  /**
   * onChange handler
   */
  onChange: (input: string) => void;
};

export const SearchBox: Component<Props> = (props) => {
  return (
    <div classList={{ [classes.wrapper]: true }}>
      <input
        classList={{ [classes.input]: true }}
        value={props.input}
        onInput={(e) =>
          props.onChange((e.currentTarget as HTMLInputElement).value)
        }
      />
    </div>
  );
};
