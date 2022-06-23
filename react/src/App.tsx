import classes from "./App.module.css";
import { Pokemon } from "./components/Pokemon";
import { pokemonMap } from "./data/pokemon";

function App() {
  return (
    <div className={classes.pokemonList}>
      {Array.from(pokemonMap.keys()).map((id) => {
        return <Pokemon key={id} id={id} searchQuery="a" />;
      })}
    </div>
  );
}

export default App;
