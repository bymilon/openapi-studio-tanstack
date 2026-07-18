import { expect, it, vi } from 'vitest'

import { recordConversion } from './record-conversion'

it('does not break the page when measurement is unavailable', () => {
  vi.stubGlobal('navigator', {
    sendBeacon() {
      throw new Error('blocked')
    },
  })

  expect(() => recordConversion('design_partner_clicked')).not.toThrow()
  vi.unstubAllGlobals()
})
