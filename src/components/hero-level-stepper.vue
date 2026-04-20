<template>
  <div class="flex items-center border border-gray-200 rounded-md overflow-hidden">
    <button
      @click="decrement"
      :disabled="level === 0"
      class="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-700 text-white"
    >
      −
    </button>
    <input
      type="number"
      :value="level"
      @change="onInput"
      min="0"
      class="w-9 h-7 text-center text-sm font-medium border-x border-gray-200 bg-gray-700 focus:outline-none"
    />
    <button
      @click="increment"
      class="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white"
    >
      +
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  heroId: string
  level: number
}>()

const emit = defineEmits<{
  update: [heroId: string, level: number]
}>()

function decrement() {
  if (props.level > 0) emit('update', props.heroId, props.level - 1)
}

function increment() {
  emit('update', props.heroId, props.level + 1)
}

function onInput(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= 0) emit('update', props.heroId, val)
}
</script>
