<script setup lang="ts">
import { computed } from 'vue';
import { itemMap } from '../data/items';

const props = defineProps<{
  /**
   * ID of item
   */
  id: string;
  /**
   * Search query, in lowercase
   */
  searchQuery: string;
}>();

const item = computed(() => itemMap.get(props.id));

const nameMarked = computed(() => {
  const i = item.value;
  if (!i) {
    return undefined;
  }
  if (!props.searchQuery) {
    return {
      unmatched: false,
      prefix: i.en,
      mark: "",
      suffix: "",
    }
  }
  const name = i.en.toLowerCase();
  const searchIndex = name.indexOf(props.searchQuery);
  if (searchIndex === -1) {
    return {
      unmatched: true,
      prefix: i.en,
      mark: "",
      suffix: "",
    }
  }
  return {
    unmatched: false,
    prefix: i.en.substring(0, searchIndex),
    mark: i.en.substring(searchIndex, searchIndex + props.searchQuery.length),
    suffix: i.en.substring(searchIndex + props.searchQuery.length),
  };
})
</script>
<template>
  <div class="wrapper" v-if="item && nameMarked">
    <div class="id">{{ item.id }}</div>
    <div>
      <span :class="['name', {unmatchedName: nameMarked.unmatched}]">
        {{ nameMarked.prefix }}<mark v-if="nameMarked.mark">{{ nameMarked.mark }}</mark>{{ nameMarked.suffix }}
      </span>
    </div>
    <div>{{ item.ja }}</div>
  </div>
</template>
<style scoped>
.wrapper {
  background-color: var(--bg-sub-color);
}

.id {
  color: var(--text-sub-color);
}

.name > mark {
  font-weight: bold;
}

.unmatchedName {
  color: var(--text-sub-color);
}
</style>
