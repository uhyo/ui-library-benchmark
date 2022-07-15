import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import classes from "./App.module.css";
import { Item } from "./components/Item";
import { SearchBox } from "./components/SearchBox";
import { itemMap, oneSetSize } from "./data/items";

export function App() {
  const [dataSetRepeat, setDataSetRepeatSize] = useState(1);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const onChange = useCallback((input: string) => {
    setInput(input);
    setSearchQuery(input.toLowerCase());
  }, []);

  useEffect(() => {
    globalThis.setDataSetRepeatSize = setDataSetRepeatSize;
  }, []);

  const itemKeys = useMemo(() => {
    return Array.from(itemMap.keys()).slice(0, dataSetRepeat * oneSetSize);
  }, [dataSetRepeat]);

  return (
    <>
      <div className={classes.pokemonList}>
        {itemKeys.map((id) => {
          return <Item key={id} id={id} searchQuery={searchQuery} />;
        })}
      </div>
      <footer className={classes.footer}>
        <p>
          Data is obtained from{" "}
          <a href="https://pokeapi.co/" rel="external">
            PokéAPI
          </a>
          .
        </p>
      </footer>
      <div className={classes.searchBox}>
        <SearchBox input={input} onChange={onChange} />
      </div>
    </>
  );
}
