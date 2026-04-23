import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import GridSortBy from '@/components/grid-sort-by.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('GridSortBy', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders dropdown with options', () => {
    const wrapper = mount(GridSortBy)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'SortDropdown' }).exists()).toBe(true)
  })

  it('displays correct option text', () => {
    const wrapper = mount(GridSortBy)
    const button = wrapper.find('button')

    expect(button.text()).toContain('Alphabetical Ascending (A-Z)')
  })

  it('binds to store sortBy', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(GridSortBy)

    // Click the button to open the dropdown
    const button = wrapper.find('button')
    await button.trigger('click')
    await wrapper.vm.$nextTick()

    // Find and click the "Level Highest to Lowest" option
    const options = wrapper.findAll('button')
    const levelDescOption = options.find((opt) => opt.text().includes('Level Highest to Lowest'))
    expect(levelDescOption).toBeDefined()

    await levelDescOption?.trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.sortBy).toBe('level-desc')

    // Verify the button now shows the new selection
    const updatedButton = wrapper.find('button')
    expect(updatedButton.text()).toContain('Level Highest to Lowest')
  })
})
