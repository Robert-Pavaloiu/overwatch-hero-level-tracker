import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeroProgressBar from '@/components/hero-progress-bar.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('HeroProgressBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows 0% when goal is 0', () => {
    const store = useGlobalsStore()
    store.goal = 0

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    expect(wrapper.text()).toContain('0%')
  })

  it('calculates progress correctly', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 5 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    expect(wrapper.text()).toContain('50%')
  })

  it('caps progress at 100%', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 15 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 15,
      },
    })

    expect(wrapper.text()).toContain('100%')
  })

  it('applies green color when complete', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 10 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 10,
      },
    })

    await wrapper.vm.$nextTick()
    // Check the computed property directly
    expect((wrapper.vm as any).progressColour).toBe('bg-green-500')
  })

  it('applies blue color for high progress', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 7 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 7,
      },
    })

    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).progressColour).toBe('bg-blue-500')
  })

  it('applies yellow color for medium progress', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 4 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 4,
      },
    })

    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).progressColour).toBe('bg-yellow-400')
  })

  it('applies red color for low progress', async () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 1 }

    const wrapper = mount(HeroProgressBar, {
      props: {
        heroId: 'ana',
        level: 1,
      },
    })

    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).progressColour).toBe('bg-red-400')
  })
})
