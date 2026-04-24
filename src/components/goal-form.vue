<template>
  <div class="flex justify-center items-center">
    <h2 class="text-2xl text-white text-center mx-2">Set Goal</h2>
    <form>
      <input
        v-model.number="goal"
        type="number"
        placeholder="Enter your goal"
        min="0"
        class="bg-gray-700 text-white placeholder:text-gray-400 border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store'
import { computed } from 'vue'

const globalsStore = useGlobalsStore()

const goal = computed({
  get: () => globalsStore.goal,
  set: (value) => {
    globalsStore.goal = value
  },
})
</script>
