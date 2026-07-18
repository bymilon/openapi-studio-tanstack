import { expect, it } from 'vitest'

it('proves GitHub rejects a failing test', () => {
  expect('CI must reject this commit').toBe('accepted')
})
