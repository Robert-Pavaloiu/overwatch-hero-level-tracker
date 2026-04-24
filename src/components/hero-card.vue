<template>
  <div
    data-testid="hero-card"
    class="bg-gray-700 text-white rounded-lg shadow-lg p-4 flex flex-col items-center relative"
    :class="{
      'outline-2 outline-green-500 outline-offset-0': isComplete,
      celebrate: celebrating,
    }"
  >
    <svg
      v-if="isComplete"
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4 text-green-400 absolute top-4 right-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
        clip-rule="evenodd"
      />
    </svg>
    <div>
      <img :src="hero.portrait" :alt="hero.name" class="w-16 h-16 mb-2 rounded-xl" />
    </div>
    <h3 class="text-lg font-bold">{{ hero.name }}</h3>
    <p class="text-sm mb-2 capitalize">{{ hero.role }}</p>
    <hero-level-stepper :hero-id="hero.id" :level="level" @update="globalsStore.setLevel" />
    <hero-progress-bar :hero-id="hero.id" :level="level" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import heroLevelStepper from './hero-level-stepper.vue'
import heroProgressBar from './hero-progress-bar.vue'
import type { Hero } from '@/types'

const props = defineProps<{ hero: Hero }>()

const globalsStore = useGlobalsStore()
const level = computed(() => globalsStore.heroProgress[props.hero.id] || 0)
const isComplete = computed(() => globalsStore.goal > 0 && level.value >= globalsStore.goal)
const celebrating = ref(false)

watch(level, (newLevel, oldLevel) => {
  if (oldLevel < globalsStore.goal && newLevel >= globalsStore.goal) {
    celebrating.value = true
    setTimeout(() => (celebrating.value = false), 800)
  }
})
</script>

<style scoped>
@keyframes celebrate {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.06);
  }
  60% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
}

.celebrate {
  animation: celebrate 0.5s ease-out;
}
</style>
