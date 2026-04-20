import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import GoalForm from '@/components/goal-form.vue'
import { useGlobalsStore } from '@/stores/globals-store'

describe('GoalForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders input field', () => {
    const wrapper = mount(GoalForm)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('number')
    expect(input.attributes('placeholder')).toBe('Enter your goal')
  })

  it('binds to store goal', async () => {
    const store = useGlobalsStore()
    const wrapper = mount(GoalForm)
    const input = wrapper.find('input')

    await input.setValue('100')
    expect(store.goal).toBe(100)

    store.goal = 50
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('50')
  })
})
