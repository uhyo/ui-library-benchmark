import { useMemo } from "react";
import { pokemonMap } from "../../data/pokemon";
import classes from "./Pokemon.module.css";

type Props = {
  /**
   * ID of Pokemon
   */
  id: number;
  /**
   * Search query, in lowercase
   */
  searchQuery: string;
};

export const Pokemon: React.FC<Props> = ({ id, searchQuery }) => {
  const poke = pokemonMap.get(id);
  if (!poke) {
    return null;
  }

  const name = poke.en.toLowerCase();
  const { nameMarked } = useMemo(() => {
    if (!searchQuery) {
      return {
        nameMarked: <span className={classes.name}>{poke.en}</span>,
      };
    }
    const searchIndex = name.indexOf(searchQuery);
    if (searchIndex === -1) {
      return {
        nameMarked: (
          <span className={`${classes.name} ${classes.unmatchedName}`}>
            {poke.en}
          </span>
        ),
      };
    }
    return {
      nameMarked: (
        <span className={classes.name}>
          {poke.en.substring(0, searchIndex)}
          <mark>
            {poke.en.substring(searchIndex, searchIndex + searchQuery.length)}
          </mark>
          {poke.en.substring(searchIndex + searchQuery.length)}
        </span>
      ),
    };
  }, [name, searchQuery]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.id}>{poke.id}</div>
      <div>{nameMarked}</div>
      <div>{poke.ja}</div>
    </div>
  );
};
