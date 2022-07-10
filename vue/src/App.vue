<script setup lang="ts">
  import { computed, ref } from 'vue';
import { itemMap } from './data/items';
import Item from './components/Item.vue';
import SearchBox from './components/SearchBox.vue';

  const input = ref('');

  const itemIds = computed(() => Array.from(itemMap.keys()))
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
