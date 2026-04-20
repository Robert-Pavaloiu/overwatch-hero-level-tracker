import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import GridSortBy from '@/components/grid-sort-by.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('GridSortBy', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders select with options', () => {
    const wrapper = mount(GridSortBy)
    const select = wrapper.find('select')

    expect(select.exists()).toBe(true)
    expect(select.findAll('option')).toHaveLength(4)
  })

  it('displays correct option text', () => {
    const wrapper = mount(GridSortBy)
    const options = wrapper.findAll('option')

    expect(options).toHaveLength(4)
    expect(options[0]!.text()).toBe('Alphabetical Ascending (A-Z)')
    expect(options[1]!.text()).toBe('Alphabetical Descending (Z-A)')
    expect(options[2]!.text()).toBe('Level Highest to Lowest')
    expect(options[3]!.text()).toBe('Level Lowest to Highest')
  })

  it('binds to store sortBy', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(GridSortBy)
    const select = wrapper.find('select')

    await select.setValue('level-desc')
    expect(store.sortBy).toBe('level-desc')

    store.sortBy = 'name'
    await wrapper.vm.$nextTick()
    expect(select.element.value).toBe('name')
  })
})
