<template>
  <SortDropdown
    v-model="sortBy"
    :options="[
      { value: 'name', label: 'Alphabetical Ascending (A-Z)' },
      { value: 'name-desc', label: 'Alphabetical Descending (Z-A)' },
      { value: 'level-desc', label: 'Level Highest to Lowest' },
      { value: 'level', label: 'Level Lowest to Highest' },
    ]"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import SortDropdown from './sort-dropdown.vue'

const globalsStore = useGlobalsStore()
const sortBy = computed({
  get: () => globalsStore.sortBy,
  set: (value) => (globalsStore.sortBy = value),
})
</script>

<style scoped>
select option {
  background-color: #374151;
  color: white;
}

select option:checked {
  background: linear-gradient(#374151, #374151);
  background-color: #4b5563;
}
</style>
