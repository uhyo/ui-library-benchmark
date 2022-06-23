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

export const SearchBox: React.FC<Props> = ({ input, onChange }) => {
  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        value={input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
