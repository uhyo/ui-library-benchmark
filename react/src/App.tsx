import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import classes from "./App.module.css";
import { Item } from "./components/Item";
import { SearchBox } from "./components/SearchBox";
import { itemMap, oneSetSize } from "./data/items";

function App() {
  const [dataSetRepeat, setDataSetRepeatSize] = useState(1);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();
  const onChange = useCallback((input: string) => {
    setInput(input);
    startTransition(() => {
      setSearchQuery(input.toLowerCase());
    });
  }, []);

  const itemKeys = useMemo(() => {
    return Array.from(itemMap.keys()).slice(0, dataSetRepeat * oneSetSize);
  }, [dataSetRepeat]);

  useEffect(() => {
    globalThis.setDataSetRepeatSize = setDataSetRepeatSize;
  }, []);

  return (
    <>
      <PokemonList itemKeys={itemKeys} searchQuery={searchQuery} />
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

const PokemonList: React.FC<{
  itemKeys: readonly string[];
  searchQuery: string;
}> = memo(({ itemKeys, searchQuery }) => {
  return (
    <div className={classes.pokemonList}>
      {itemKeys.map((id) => {
        return <Item key={id} id={id} searchQuery={searchQuery} />;
      })}
    </div>
  );
});

export default App;
