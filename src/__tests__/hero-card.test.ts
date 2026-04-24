import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeroCard from '@/components/hero-card.vue'
import { useGlobalsStore } from '@/stores/globals-store'
import type { Hero } from '@/types'

// Mock child components
vi.mock('@/components/hero-level-stepper.vue', () => ({
  default: {
    name: 'HeroLevelStepper',
    template: '<div data-testid="stepper">Stepper</div>',
    props: ['heroId', 'level'],
    emits: ['update'],
  },
}))

vi.mock('@/components/hero-progress-bar.vue', () => ({
  default: {
    name: 'HeroProgressBar',
    template: '<div data-testid="progress-bar">ProgressBar</div>',
    props: ['heroId', 'level'],
  },
}))

describe('HeroCard', () => {
  const mockHero: Hero = {
    id: 'ana',
    name: 'Ana',
    role: 'support',
    portrait: 'https://example.com/ana.jpg',
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders hero name and role', () => {
    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    expect(wrapper.text()).toContain('Ana')
    expect(wrapper.text()).toContain('support')
  })

  it('renders hero portrait image', () => {
    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/ana.jpg')
    expect(img.attributes('alt')).toBe('Ana')
  })

  it('renders stepper and progress bar', () => {
    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    expect(wrapper.find('[data-testid="stepper"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true)
  })

  it('passes correct props to stepper and progress bar', () => {
    const store = useGlobalsStore()
    store.heroProgress = { ana: 5 }

    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    const stepper = wrapper.findComponent({ name: 'HeroLevelStepper' })
    expect(stepper.props('heroId')).toBe('ana')
    expect(stepper.props('level')).toBe(5)

    const progressBar = wrapper.findComponent({ name: 'HeroProgressBar' })
    expect(progressBar.props('heroId')).toBe('ana')
    expect(progressBar.props('level')).toBe(5)
  })

  it('shows checkmark when complete', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 10 }

    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    await wrapper.vm.$nextTick()
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('hides checkmark when not complete', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 5 }

    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(false)
  })

  it('has green outline when complete', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 10 }

    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('outline-green-500')
  })

  it('calls store.setLevel when stepper updates', async () => {
    const store = useGlobalsStore()
    const setLevelSpy = vi.spyOn(store, 'setLevel')

    const wrapper = mount(HeroCard, {
      props: { hero: mockHero },
    })

    // Simulate the stepper emitting an update event through the component
    const stepper = wrapper.findComponent({ name: 'HeroLevelStepper' })
    stepper.vm.$emit('update', 'ana', 10)
    await wrapper.vm.$nextTick()

    expect(setLevelSpy).toHaveBeenCalledWith('ana', 10)
    setLevelSpy.mockRestore()
  })
})
