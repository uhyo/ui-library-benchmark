import { useMemo } from "react";
import { itemMap } from "../../data/items";
import classes from "./Item.module.css";

type Props = {
  /**
   * ID of Item
   */
  id: string;
  /**
   * Search query, in lowercase
   */
  searchQuery: string;
};

export const Item: React.FC<Props> = ({ id, searchQuery }) => {
  const item = useMemo(() => itemMap.get(id), [id]);

  const nameMarked = useMemo(() => {
    if (!item) {
      return undefined;
    }
    if (!searchQuery) {
      return <span className={classes.name}>{item.en}</span>;
    }
    const name = item.en.toLowerCase();
    const searchIndex = name.indexOf(searchQuery);
    if (searchIndex === -1) {
      return (
        <span className={`${classes.name} ${classes.unmatchedName}`}>
          {item.en}
        </span>
      );
    }
    return (
      <span className={classes.name}>
        {item.en.substring(0, searchIndex)}
        <mark>
          {item.en.substring(searchIndex, searchIndex + searchQuery.length)}
        </mark>
        {item.en.substring(searchIndex + searchQuery.length)}
      </span>
    );
  }, [item, searchQuery]);

  if (!item) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.id}>{item.id}</div>
      <div>{nameMarked}</div>
      <div>{item.ja}</div>
    </div>
  );
};
