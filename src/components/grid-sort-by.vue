<template>
  <div>
    <select
      v-model="sortBy"
      class="rounded border-white border px-4 py-2 text-sm font-semibold transition text-white bg-gray-700"
    >
      <option value="name">Alphabetical Ascending (A-Z)</option>
      <option value="role">Alphabetical Descending (Z-A)</option>
      <option value="level-desc">Level Highest to Lowest</option>
      <option value="level">Level Lowest to Highest</option>
    </select>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'

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
