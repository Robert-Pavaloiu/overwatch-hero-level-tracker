import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { HeroProgress } from '@/types'
import type { Hero } from '@/types'
import heroData from '@/data/heroes.json'

const heroes = heroData as Hero[]

type HeroFilter = 'below-goal' | 'tank' | 'damage' | 'support'

export const useGlobalsStore = defineStore(
  'globals',
  () => {
    const goal = ref<number>(0)
    const heroProgress = ref<HeroProgress>({})
    const heroCounter = ref<number>(heroes.length)
    const selectedFilters = ref<HeroFilter[]>([])
    const sortBy = ref<string>('name')

    const heroesCompleted = computed(() => {
      return Object.keys(heroProgress.value).filter(
        (heroId) => (heroProgress.value[heroId] ?? 0) >= goal.value,
      ).length
    })

    const heroesNotStarted = computed(() => {
      return heroes.filter((hero) => (heroProgress.value[hero.id] ?? 0) == 0).length
    })

    const filteredHeroes = computed(() => {
      let result = heroes

      if (selectedFilters.value.length > 0) {
        const roleFilters = selectedFilters.value.filter((filter) =>
          ['tank', 'damage', 'support'].includes(filter),
        ) as Hero['role'][]

        result = heroes.filter((hero) => {
          const matchesRole = roleFilters.length === 0 || roleFilters.includes(hero.role)
          const matchesBelowGoal = selectedFilters.value.includes('below-goal')
            ? (heroProgress.value[hero.id] ?? 0) < goal.value
            : true

          return matchesRole && matchesBelowGoal
        })
      }

      result = [...result].sort((a, b) => {
        switch (sortBy.value) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'role':
            return b.name.localeCompare(a.name)
          case 'level':
            const levelA = heroProgress.value[a.id] ?? 0
            const levelB = heroProgress.value[b.id] ?? 0
            return levelA - levelB
          case 'level-desc':
            const levelADesc = heroProgress.value[a.id] ?? 0
            const levelBDesc = heroProgress.value[b.id] ?? 0
            return levelBDesc - levelADesc
          default:
            return 0
        }
      })

      return result
    })

    const toggleFilter = (filter: HeroFilter) => {
      const current = selectedFilters.value
      const index = current.indexOf(filter)
      if (index === -1) {
        selectedFilters.value = [...current, filter]
      } else {
        selectedFilters.value = current.filter((f) => f !== filter)
      }
    }

    const clearFilters = () => {
      selectedFilters.value = []
    }

    return {
      goal,
      heroProgress,
      heroCounter,
      heroesCompleted,
      heroesNotStarted,
      selectedFilters,
      sortBy,
      filteredHeroes,
      toggleFilter,
      clearFilters,
    }
  },
  {
    persist: {
      pick: ['goal', 'heroProgress'],
    },
  },
)
