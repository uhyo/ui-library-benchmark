import { useCallback, useState } from "preact/hooks";
import classes from "./App.module.css";
import { Item } from "./components/Item";
import { SearchBox } from "./components/SearchBox";
import { itemMap } from "./data/items";

export function App() {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const onChange = useCallback((input: string) => {
    setInput(input);
    setSearchQuery(input.toLowerCase());
  }, []);

  return (
    <>
      <div className={classes.pokemonList}>
        {Array.from(itemMap.keys()).map((id) => {
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
