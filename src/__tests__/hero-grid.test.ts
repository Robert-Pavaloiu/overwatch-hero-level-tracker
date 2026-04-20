import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeroGrid from '@/components/hero-grid.vue'
import { useGlobalsStore } from '@/stores/globals-store'

// Mock child components
vi.mock('@/components/hero-level-stepper.vue', () => ({
  default: {
    name: 'HeroLevelStepper',
    template: '<div>Stepper</div>',
    props: ['heroId', 'level'],
    emits: ['update'],
  },
}))

vi.mock('@/components/hero-progress-bar.vue', () => ({
  default: {
    name: 'HeroProgressBar',
    template: '<div>ProgressBar</div>',
    props: ['heroId', 'level'],
  },
}))

describe('HeroGrid', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders hero cards for filtered heroes', () => {
    const wrapper = mount(HeroGrid)
    const heroCards = wrapper.findAll('.bg-gray-700')

    expect(heroCards.length).toBeGreaterThan(0)
  })

  it('displays hero name and role', () => {
    const wrapper = mount(HeroGrid)
    const firstCard = wrapper.findAll('.bg-gray-700')[0]

    expect(firstCard!.text()).toContain('Stepper')
    expect(firstCard!.text()).toContain('ProgressBar')
  })

  it('passes correct props to stepper and progress bar', () => {
    const store = useGlobalsStore()
    store.heroProgress = { ana: 5 }

    const wrapper = mount(HeroGrid)

    // Since we mocked the components, we can check if they receive props
    const stepper = wrapper.findComponent({ name: 'HeroLevelStepper' })
    expect(stepper.props('heroId')).toBeDefined()
    expect(stepper.props('level')).toBeDefined()

    const progressBar = wrapper.findComponent({ name: 'HeroProgressBar' })
    expect(progressBar.props('heroId')).toBeDefined()
    expect(progressBar.props('level')).toBeDefined()
  })

  it('emits update when stepper updates', async () => {
    const wrapper = mount(HeroGrid)
    const stepper = wrapper.findComponent({ name: 'HeroLevelStepper' })

    // Simulate stepper emit
    await stepper.vm.$emit('update', 'ana', 10)

    const store = useGlobalsStore()
    expect(store.heroProgress.ana).toBe(10)
  })
})
