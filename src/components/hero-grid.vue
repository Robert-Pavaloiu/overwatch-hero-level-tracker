<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
    <hero-card v-for="hero in filteredHeroes" :key="hero.id" :hero="hero" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import heroCard from './hero-card.vue'

const globalsStore = useGlobalsStore()
const filteredHeroes = computed(() => globalsStore.filteredHeroes)
</script>
