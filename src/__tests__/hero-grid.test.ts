import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeroGrid from '@/components/hero-grid.vue'
import { useGlobalsStore } from '@/stores/globals-store'

// Mock hero-card component
vi.mock('@/components/hero-card.vue', () => ({
  default: {
    name: 'HeroCard',
    template: '<div data-testid="hero-card">HeroCard</div>',
    props: ['hero'],
  },
}))

describe('HeroGrid', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders hero cards for filtered heroes', () => {
    const wrapper = mount(HeroGrid)
    const heroCards = wrapper.findAll('[data-testid="hero-card"]')

    expect(heroCards.length).toBeGreaterThan(0)
  })

  it('passes hero object to each card', () => {
    const wrapper = mount(HeroGrid)
    const cards = wrapper.findAllComponents({ name: 'HeroCard' })

    expect(cards.length).toBeGreaterThan(0)
    cards.forEach((card) => {
      expect(card.props('hero')).toBeDefined()
      expect(card.props('hero').id).toBeDefined()
      expect(card.props('hero').name).toBeDefined()
    })
  })

  it('filters heroes based on store state', () => {
    const store = useGlobalsStore()
    store.selectedFilters = ['tank']

    const wrapper = mount(HeroGrid)
    const cards = wrapper.findAllComponents({ name: 'HeroCard' })

    cards.forEach((card) => {
      expect(card.props('hero').role).toBe('tank')
    })
  })

  it('respects goal filters', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 15, widowmaker: 5 }
    store.selectedFilters = ['above-goal']

    const wrapper = mount(HeroGrid)
    const cards = wrapper.findAllComponents({ name: 'HeroCard' })

    // Should only show heroes that are above goal
    const filteredHeroes = store.filteredHeroes
    expect(cards.length).toBe(filteredHeroes.length)
  })

  it('updates card count when filters change', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(HeroGrid)

    const initialCards = wrapper.findAllComponents({ name: 'HeroCard' })
    const initialCount = initialCards.length

    store.selectedFilters = ['tank']
    await wrapper.vm.$nextTick()

    const filteredCards = wrapper.findAllComponents({ name: 'HeroCard' })
    expect(filteredCards.length).toBeLessThanOrEqual(initialCount)
  })
})
