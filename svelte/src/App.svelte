<script lang="ts">
  import { onMount } from "svelte";

  import Item from "./components/Item.svelte";
  import SearchBox from "./components/SearchBox.svelte";
  import { itemMap, oneSetSize } from "./data/items";

  let dataSetRepeat = 1;
  let input = "";
  let searchQuery = "";
  $: itemIds = Array.from(itemMap.keys()).slice(0, dataSetRepeat * oneSetSize);

  let timerId: ReturnType<typeof setTimeout> | undefined;
  $: {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      searchQuery = input;
    }, 100);
  }

  onMount(() => {
    globalThis.setDataSetRepeatSize = (newDataSetRepeatSize: number) => {
      dataSetRepeat = newDataSetRepeatSize;
    };
  });
</script>

<div class="pokemonList">
  {#each itemIds as id (id)}
    <Item {id} {searchQuery} />
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
    grid-template-columns: repeat(auto-fill, 160px);
    grid-auto-rows: 4em;
    grid-gap: 20px;
    margin: 20px;
    justify-content: space-between;
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
