<script lang="ts">
  import Item from "./components/Item.svelte";
  import SearchBox from "./components/SearchBox.svelte";
  import { itemMap } from "./data/items";

  let input = "";
  const itemIds = Array.from(itemMap.keys());
</script>

<div class="pokemonList">
  {#each itemIds as id}
    <Item {id} searchQuery={input} />
  {/each}
</div>

<footer>
  <p>
    Data is obtained from <a href="https://pokeapi.co/" rel="external"
      >PokéAPI</a
    >.
  </p>
</footer>

<div class="searchBox">
  <SearchBox bind:value={input} />
</div>

<style>
  .pokemonList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 20px;
    margin: 20px;
  }

  .searchBox {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  }

  footer {
    text-align: center;
  }
</style>
