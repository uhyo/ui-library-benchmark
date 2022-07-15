<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
import { itemMap, oneSetSize } from './data/items';
import Item from './components/Item.vue';
import SearchBox from './components/SearchBox.vue';

  const dataSetRepeat = ref(1);
  const input = ref('');

  const itemIds = computed(() => Array.from(itemMap.keys()).slice(0, dataSetRepeat.value * oneSetSize));

  onMounted(() => {
    globalThis.setDataSetRepeatSize = (size: number) => {
      dataSetRepeat.value = size;
    };
  })
</script>

<template>
  <div class="pokemonList">
    <Item v-for="id in itemIds" :key="id" :id="id" :search-query="input" />
  </div>
  <footer>
    <p>
      Data is obtained from
      <a href="https://pokeapi.co/" rel="external">
        PokéAPI
      </a>
      .
    </p>
  </footer>
  <div class="searchBox">
    <SearchBox v-model="input" />
  </div>
</template>

<style scoped>
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
