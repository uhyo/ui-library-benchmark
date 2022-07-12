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

export const SearchBox: preact.FunctionComponent<Props> = ({
  input,
  onChange,
}) => {
  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        value={input}
        onInput={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};
