import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { HeroProgress } from '@/types'
import type { Hero } from '@/types'
import heroData from '@/data/heroes.json'

const heroes = heroData as Hero[]

export const useGlobalsStore = defineStore(
  'globals',
  () => {
    const goal = ref<number>(0)
    const heroProgress = ref<HeroProgress>({})
    const heroCounter = ref<number>(heroes.length)
    const heroesCompleted = computed(() => {
      return Object.keys(heroProgress.value).filter(
        (heroId) => (heroProgress.value[heroId] ?? 0) >= goal.value,
      ).length
    })
    const heroesNotStarted = computed(() => {
      return heroes.filter((hero) => (heroProgress.value[hero.id] ?? 0) == 0).length
    })
    return {
      goal,
      heroProgress,
      heroCounter,
      heroesCompleted,
      heroesNotStarted,
    }
  },
  {
    persist: true,
  },
)
