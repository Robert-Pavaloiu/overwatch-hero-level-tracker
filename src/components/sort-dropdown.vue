<template>
  <div class="relative" ref="container">
    <button
      @click="open = !open"
      class="rounded-full border border-gray-600 px-4 py-2 mt-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 flex items-center gap-2"
    >
      {{ props.options.find((o) => o.value === props.modelValue)?.label }}
      <span class="text-xs">▾</span>
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-2 bg-gray-800 border border-gray-600 rounded-2xl overflow-hidden z-10 min-w-max shadow-lg"
    >
      <button
        v-for="option in props.options"
        :key="option.value"
        @click="select(option.value)"
        class="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
        :class="{
          'text-white font-semibold': option.value === props.modelValue,
          'text-gray-300': option.value !== props.modelValue,
        }"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const container = ref<HTMLElement | null>(null)

onClickOutside(container, () => (open.value = false))

function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}
</script>
