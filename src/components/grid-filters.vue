<template>
  <div class="grid-filters flex flex-wrap gap-3 p-4 pt-6 rounded-2xl justify-center">
    <button
      type="button"
      @click="clearFilters"
      :class="[
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        selectedFilters.length === 0 ? activeClasses : inactiveClasses,
      ]"
    >
      All
    </button>

    <button
      type="button"
      @click="toggleFilter('below-goal')"
      :class="[
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        selectedFilters.includes('below-goal') ? activeClasses : inactiveClasses,
      ]"
    >
      Below goal
    </button>

    <button
      type="button"
      @click="toggleFilter('tank')"
      :class="[
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        selectedFilters.includes('tank') ? activeClasses : inactiveClasses,
      ]"
    >
      Tank
    </button>

    <button
      type="button"
      @click="toggleFilter('damage')"
      :class="[
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        selectedFilters.includes('damage') ? activeClasses : inactiveClasses,
      ]"
    >
      Damage
    </button>

    <button
      type="button"
      @click="toggleFilter('support')"
      :class="[
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        selectedFilters.includes('support') ? activeClasses : inactiveClasses,
      ]"
    >
      Support
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'

type HeroFilter = 'below-goal' | 'tank' | 'damage' | 'support'

const globalsStore = useGlobalsStore()
const selectedFilters = computed(() => globalsStore.selectedFilters)

const activeClasses = 'bg-white text-slate-900 border-transparent'
const inactiveClasses = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'

const toggleFilter = (filter: HeroFilter) => {
  globalsStore.toggleFilter(filter)
}

const clearFilters = () => {
  globalsStore.clearFilters()
}
</script>
