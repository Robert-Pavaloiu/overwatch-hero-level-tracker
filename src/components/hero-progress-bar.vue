<template>
  <div class="w-full mt-4 mb-2 px-4 text-center">
    <span class="text-sm font-bold" :class="isComplete ? 'text-green-600' : 'text-white'">
      {{ isComplete ? 'Complete!' : progressNumber + ' to go' }}
    </span>
    <div class="w-full bg-gray-600 rounded-full h-4 overflow-hidden border border-gray-500 mt-1">
      <div
        class="h-4 rounded-full transition-all duration-500"
        :class="progressColour"
        :style="{ width: progress + '%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store'
import { computed } from 'vue'

const props = defineProps<{
  heroId: string
  level: number
}>()

const globalsStore = useGlobalsStore()

const progress = computed(() => {
  if (globalsStore.goal === 0) return 0
  return Math.min((props.level / globalsStore.goal) * 100, 100)
})

const progressNumber = computed(() => {
  return globalsStore.goal - props.level
})

const isComplete = computed(() => {
  return props.level >= globalsStore.goal
})

const progressColour = computed(() => {
  if (progress.value >= 100) return 'bg-green-500'
  if (progress.value >= 60) return 'bg-blue-500'
  if (progress.value >= 30) return 'bg-yellow-400'
  return 'bg-red-400'
})
</script>
