<template>
  <div class="flex justify-center items-center">
    <h2 class="text-2xl text-white text-center mx-2">Set Goal</h2>
    <form>
      <input
        v-model="globalsStore.goal"
        type="number"
        placeholder="Enter your goal"
        class="bg-gray-700 text-white placeholder:text-gray-400 border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store'
const globalsStore = useGlobalsStore()
</script>
