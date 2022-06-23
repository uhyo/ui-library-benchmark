import { useCallback, useState, useTransition } from "react";
import classes from "./App.module.css";
import { Pokemon } from "./components/Pokemon";
import { SearchBox } from "./components/SearchBox";
import { pokemonMap } from "./data/pokemon";

function App() {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();
  const onChange = useCallback((input: string) => {
    setInput(input);
    startTransition(() => {
      setSearchQuery(input.toLowerCase());
    });
  }, []);

  return (
    <>
      <div className={classes.pokemonList}>
        {Array.from(pokemonMap.keys()).map((id) => {
          return <Pokemon key={id} id={id} searchQuery={searchQuery} />;
        })}
      </div>
      <div className={classes.searchBox}>
        <SearchBox input={input} onChange={onChange} />
      </div>
    </>
  );
}

export default App;
