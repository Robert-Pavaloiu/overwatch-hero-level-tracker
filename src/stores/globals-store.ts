/// <reference types="pinia-plugin-persistedstate" />
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { HeroProgress, Hero, HeroFilter } from '@/types'
import heroData from '@/data/heroes.json'

const heroes = heroData as Hero[]

export const useGlobalsStore = defineStore(
  'globals',
  () => {
    const goal = ref<number>(0)
    const heroProgress = ref<HeroProgress>({})
    const heroCounter: number = heroes.length
    const selectedFilters = ref<HeroFilter[]>([])
    const sortBy = ref<string>('name')

    const heroesCompleted = computed(() => {
      if (goal.value === 0) return 0
      return heroes.filter((hero) => (heroProgress.value[hero.id] ?? 0) >= goal.value).length
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
          const matchesAboveGoal = selectedFilters.value.includes('above-goal')
            ? (heroProgress.value[hero.id] ?? 0) >= goal.value
            : true

          return matchesRole && matchesBelowGoal && matchesAboveGoal
        })
      }

      result = [...result].sort((a, b) => {
        switch (sortBy.value) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          case 'level': {
            const levelA = heroProgress.value[a.id] ?? 0
            const levelB = heroProgress.value[b.id] ?? 0
            return levelA - levelB
          }
          case 'level-desc': {
            const levelADesc = heroProgress.value[a.id] ?? 0
            const levelBDesc = heroProgress.value[b.id] ?? 0
            return levelBDesc - levelADesc
          }
          default:
            return 0
        }
      })

      return result
    })

    const toggleFilter = (filter: HeroFilter) => {
      const current = selectedFilters.value
      const index = current.indexOf(filter)

      // Handle exclusive goal filters
      if (filter === 'above-goal' || filter === 'below-goal') {
        const otherGoalFilter = filter === 'above-goal' ? 'below-goal' : 'above-goal'
        if (index === -1) {
          selectedFilters.value = [...current.filter((f) => f !== otherGoalFilter), filter]
        } else {
          selectedFilters.value = current.filter((f) => f !== filter)
        }
      } else {
        // Normal toggle for role filters
        if (index === -1) {
          selectedFilters.value = [...current, filter]
        } else {
          selectedFilters.value = current.filter((f) => f !== filter)
        }
      }
    }

    const clearFilters = () => {
      selectedFilters.value = []
    }

    const setLevel = (heroId: string, level: number) => {
      heroProgress.value[heroId] = level
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
      setLevel,
    }
  },
  {
    persist: {
      pick: ['goal', 'heroProgress'],
    },
  },
)
