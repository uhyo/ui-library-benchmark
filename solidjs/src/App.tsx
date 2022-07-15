import {
  Component,
  createMemo,
  createSignal,
  Index,
  onMount,
  useTransition,
} from "solid-js";
import classes from "./App.module.css";
import { Item } from "./components/Item";
import { SearchBox } from "./components/SearchBox";
import { itemMap, oneSetSize } from "./data/items";

const App: Component = () => {
  const [dataSetRepeat, setDataSetRepeatSize] = createSignal(1);
  const [input, setInput] = createSignal("");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [, startTransition] = useTransition();

  const onChange = (input: string) => {
    setInput(input);
    startTransition(() => {
      setSearchQuery(input.toLowerCase());
    });
  };

  const itemKeys = createMemo(() =>
    Array.from(itemMap.keys()).slice(0, dataSetRepeat() * oneSetSize)
  );

  onMount(() => {
    globalThis.setDataSetRepeatSize = setDataSetRepeatSize;
  });

  return (
    <>
      <div classList={{ [classes.pokemonList]: true }}>
        <Index each={itemKeys()}>
          {(id) => <Item id={id()} searchQuery={searchQuery()} />}
        </Index>
      </div>
      <footer classList={{ [classes.footer]: true }}>
        <p>
          Data is obtained from{" "}
          <a href="https://pokeapi.co/" rel="external">
            PokéAPI
          </a>
          .
        </p>
      </footer>
      <div classList={{ [classes.searchBox]: true }}>
        <SearchBox input={input()} onChange={onChange} />
      </div>
    </>
  );
};

export default App;
