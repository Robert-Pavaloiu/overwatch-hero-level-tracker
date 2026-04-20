<template>
  <div class="text-white flex justify-around pt-4">
    <div class="bg-gray-700 w-1/6 text-center p-2 rounded-xl shadow-lg border-2 border-amber-200">
      <p>At Goal</p>
      <h1>{{ globalsStore.heroesCompleted }}</h1>
    </div>
    <div class="bg-gray-700 w-1/6 text-center p-2 rounded-xl shadow-lg border-2 border-amber-300">
      <p>In Progress</p>
      <h1>
        {{
          globalsStore.heroCounter - globalsStore.heroesCompleted - globalsStore.heroesNotStarted
        }}
      </h1>
    </div>
    <div class="bg-gray-700 w-1/6 text-center p-2 rounded-xl shadow-lg border-2 border-amber-400">
      <p>Not Started</p>
      <h1>{{ globalsStore.heroesNotStarted }}</h1>
    </div>
    <div class="bg-gray-700 w-1/6 text-center p-2 rounded-xl shadow-lg border-2 border-amber-500">
      <p>Total Heroes</p>
      <h1>{{ globalsStore.heroCounter }}</h1>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useGlobalsStore } from '@/stores/globals-store'
const globalsStore = useGlobalsStore()
</script>
