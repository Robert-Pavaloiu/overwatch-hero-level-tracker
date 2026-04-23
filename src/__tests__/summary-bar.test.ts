import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import SummaryBar from '@/components/summary-bar.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('SummaryBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('displays summary statistics', () => {
    const store = useGlobalsStore()
    store.goal = 10
    store.heroProgress = { ana: 10, reinhardt: 5, tracer: 0 } // 1 completed, 1 in progress, 1 not started

    const wrapper = mount(SummaryBar)

    expect(wrapper.text()).toContain('At Goal')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('In Progress')
    expect(wrapper.text()).toContain('1') // reinhardt has 5 < 10
    expect(wrapper.text()).toContain('Not Started')
    expect(wrapper.text()).toContain('49') // 51 total - 1 completed - 1 in progress = 49 not started
    expect(wrapper.text()).toContain('Total Heroes')
    expect(wrapper.text()).toContain('51')
  })

  it('renders four summary boxes', () => {
    const wrapper = mount(SummaryBar)
    const boxes = wrapper.findAll('.bg-gray-700')

    expect(boxes).toHaveLength(4)
  })
})
