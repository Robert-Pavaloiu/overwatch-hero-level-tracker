import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import GridFilters from '@/components/grid-filters.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('GridFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders all filter buttons', () => {
    const wrapper = mount(GridFilters)
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(5)
    expect(buttons[0]!.text()).toBe('All')
    expect(buttons[1]!.text()).toBe('Below goal')
    expect(buttons[2]!.text()).toBe('Tank')
    expect(buttons[3]!.text()).toBe('Damage')
    expect(buttons[4]!.text()).toBe('Support')
  })

  it('applies active classes when filter is selected', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(GridFilters)

    store.selectedFilters = ['tank']
    await wrapper.vm.$nextTick()

    const tankButton = wrapper.findAll('button')[2] // Tank button
    expect(tankButton!.classes()).toContain('bg-white')
    expect(tankButton!.classes()).toContain('text-slate-900')
  })

  it('applies inactive classes when filter is not selected', () => {
    const wrapper = mount(GridFilters)
    const tankButton = wrapper.findAll('button')[2]

    expect(tankButton!.classes()).toContain('bg-slate-800')
    expect(tankButton!.classes()).toContain('text-slate-200')
  })

  it('toggles filter on button click', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(GridFilters)
    const tankButton = wrapper.findAll('button')[2]

    await tankButton!.trigger('click')
    expect(store.selectedFilters).toEqual(['tank'])

    await tankButton!.trigger('click')
    expect(store.selectedFilters).toEqual([])
  })

  it('clears all filters on All button click', async () => {
    const store = useGlobalsStore()
    store.selectedFilters = ['tank', 'damage']

    const wrapper = mount(GridFilters)
    const allButton = wrapper.findAll('button')[0]

    await allButton!.trigger('click')
    expect(store.selectedFilters).toEqual([])
  })
})
