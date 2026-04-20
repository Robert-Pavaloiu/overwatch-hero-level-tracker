<template>
  <div class="grid grid-cols-5 gap-4 p-4">
    <div
      v-for="hero in filteredHeroes"
      :key="hero.id"
      class="bg-gray-700 text-white rounded-lg shadow-lg p-4 flex flex-col items-center"
    >
      <img :src="hero.portrait" :alt="hero.name" class="w-16 h-16 mb-2 rounded-xl" />
      <h3 class="text-lg font-bold">{{ hero.name }}</h3>
      <p class="text-sm mb-2 capitalize">{{ hero.role }}</p>
      <hero-level-stepper
        :hero-id="hero.id"
        :level="progress[hero.id] || 0"
        @update="(id, level) => (progress[id] = level)"
      />
      <hero-progress-bar :hero-id="hero.id" :level="progress[hero.id] || 0" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import heroLevelStepper from './hero-level-stepper.vue'
import heroProgressBar from './hero-progress-bar.vue'

const globalsStore = useGlobalsStore()
const progress = computed(() => globalsStore.heroProgress)
const filteredHeroes = computed(() => globalsStore.filteredHeroes)
</script>
