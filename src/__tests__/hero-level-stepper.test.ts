import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroLevelStepper from '@/components/hero-level-stepper.vue'

describe('HeroLevelStepper', () => {
  it('renders with initial level', () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('5')
  })

  it('emits update on increment', async () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    const incrementBtn = wrapper.findAll('button')[1] // second button is +
    await incrementBtn!.trigger('click')

    expect(wrapper.emitted('update')).toHaveLength(1)
    expect(wrapper.emitted('update')![0]).toEqual(['ana', 6])
  })

  it('emits update on decrement when level > 0', async () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    const decrementBtn = wrapper.findAll('button')[0] // first button is -
    await decrementBtn!.trigger('click')

    expect(wrapper.emitted('update')).toHaveLength(1)
    expect(wrapper.emitted('update')![0]).toEqual(['ana', 4])
  })

  it('does not decrement below 0', async () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 0,
      },
    })

    const decrementBtn = wrapper.findAll('button')[0]
    expect(decrementBtn!.attributes('disabled')).toBeDefined()

    await decrementBtn!.trigger('click')
    expect(wrapper.emitted('update')).toBeUndefined()
  })

  it('emits update on input change', async () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('10')

    expect(wrapper.emitted('update')).toHaveLength(1)
    expect(wrapper.emitted('update')![0]).toEqual(['ana', 10])
  })

  it('does not emit invalid input', async () => {
    const wrapper = mount(HeroLevelStepper, {
      props: {
        heroId: 'ana',
        level: 5,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('invalid')

    expect(wrapper.emitted('update')).toBeUndefined()
  })
})
