import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalsStore } from '@/stores/globals-store'

describe('useGlobalsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useGlobalsStore()

    expect(store.goal).toBe(0)
    expect(store.heroProgress).toEqual({})
    expect(store.heroCounter).toBe(51) // Actual number of heroes in data
    expect(store.selectedFilters).toEqual([])
    expect(store.sortBy).toBe('name')
  })

  it('computes heroesCompleted correctly', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 10, reinhardt: 5, tracer: 15 }

    expect(store.heroesCompleted).toBe(2) // ana and tracer >= 10
  })

  it('computes heroesNotStarted correctly', () => {
    const store = useGlobalsStore()
    // Set progress for a few heroes, others default to 0
    store.heroProgress = { ana: 0, reinhardt: 5, tracer: 0 }

    // Only reinhardt has progress > 0, so 50 heroes not started (51 - 1)
    expect(store.heroesNotStarted).toBe(50)
  })

  it('filters heroes by role', () => {
    const store = useGlobalsStore()
    store.selectedFilters = ['tank']

    const filtered = store.filteredHeroes
    expect(filtered.every((hero) => hero.role === 'tank')).toBe(true)
  })

  it('filters heroes below goal', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 5, reinhardt: 15, tracer: 8 }
    store.selectedFilters = ['below-goal']

    const filtered = store.filteredHeroes
    expect(filtered.every((hero) => (store.heroProgress[hero.id] ?? 0) < 10)).toBe(true)
  })

  it('filters heroes above or at goal', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 5, reinhardt: 15, tracer: 10 }
    store.selectedFilters = ['above-goal']

    const filtered = store.filteredHeroes
    expect(filtered.every((hero) => (store.heroProgress[hero.id] ?? 0) >= 10)).toBe(true)
    expect(filtered.map((h) => h.id)).toEqual(['reinhardt', 'tracer']) // 15 and 10
  })

  it('sorts heroes by name ascending', () => {
    const store = useGlobalsStore()
    store.sortBy = 'name'

    const sorted = store.filteredHeroes
    const names = sorted.map((h) => h.name)
    expect(names).toEqual([...names].sort())
  })

  it('sorts heroes by level descending', () => {
    const store = useGlobalsStore()
    store.heroProgress = { ana: 5, reinhardt: 15, tracer: 10 }
    store.sortBy = 'level-desc'

    const sorted = store.filteredHeroes
    expect(sorted[0]!.id).toBe('reinhardt') // 15
    expect(sorted[1]!.id).toBe('tracer') // 10
    expect(sorted[2]!.id).toBe('ana') // 5
  })

  it('toggles filters correctly', () => {
    const store = useGlobalsStore()

    store.toggleFilter('tank')
    expect(store.selectedFilters).toEqual(['tank'])

    store.toggleFilter('tank')
    expect(store.selectedFilters).toEqual([])
  })

  it('clears filters', () => {
    const store = useGlobalsStore()
    store.selectedFilters = ['tank', 'damage']

    store.clearFilters()
    expect(store.selectedFilters).toEqual([])
  })
})
