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
  const item = itemMap.get(id);
  if (!item) {
    return null;
  }

  const name = item.en.toLowerCase();
  const { nameMarked } = useMemo(() => {
    if (!searchQuery) {
      return {
        nameMarked: <span className={classes.name}>{item.en}</span>,
      };
    }
    const searchIndex = name.indexOf(searchQuery);
    if (searchIndex === -1) {
      return {
        nameMarked: (
          <span className={`${classes.name} ${classes.unmatchedName}`}>
            {item.en}
          </span>
        ),
      };
    }
    return {
      nameMarked: (
        <span className={classes.name}>
          {item.en.substring(0, searchIndex)}
          <mark>
            {item.en.substring(searchIndex, searchIndex + searchQuery.length)}
          </mark>
          {item.en.substring(searchIndex + searchQuery.length)}
        </span>
      ),
    };
  }, [name, item.en, searchQuery]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.id}>{item.id}</div>
      <div>{nameMarked}</div>
      <div>{item.ja}</div>
    </div>
  );
};
