import { afterEach, describe, expect, it, vi } from 'vitest'

import { handleConversionEvent } from './conversion-event.server'

afterEach(() => vi.restoreAllMocks())

describe('conversion event', () => {
  it('logs only an approved event name', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const response = await handleConversionEvent(
      new Request('https://example.test/events/conversion', {
        method: 'POST',
        headers: { origin: 'https://example.test', 'sec-fetch-site': 'same-origin' },
        body: JSON.stringify({ name: 'design_partner_clicked' }),
      }),
    )

    expect(response.status).toBe(204)
    expect(log).toHaveBeenCalledWith({
      event: 'conversion.recorded',
      conversionName: 'design_partner_clicked',
    })
  })

  it('rejects payload fields and unknown events', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const response = await handleConversionEvent(
      new Request('https://example.test/events/conversion', {
        method: 'POST',
        headers: { origin: 'https://example.test', 'sec-fetch-site': 'same-origin' },
        body: JSON.stringify({ name: 'design_partner_clicked', email: 'person@example.test' }),
      }),
    )

    expect(response.status).toBe(400)
    expect(log).not.toHaveBeenCalled()
  })

  it('rejects cross-origin events', async () => {
    const response = await handleConversionEvent(
      new Request('https://example.test/events/conversion', {
        method: 'POST',
        headers: { origin: 'https://attacker.test', 'sec-fetch-site': 'cross-site' },
        body: JSON.stringify({ name: 'page_viewed' }),
      }),
    )

    expect(response.status).toBe(403)
  })

  it('rejects oversized streamed events', async () => {
    const response = await handleConversionEvent(
      new Request('https://example.test/events/conversion', {
        method: 'POST',
        headers: { origin: 'https://example.test', 'sec-fetch-site': 'same-origin' },
        body: JSON.stringify({ name: 'page_viewed', padding: 'x'.repeat(80) }),
      }),
    )

    expect(response.status).toBe(400)
  })

  it('rejects unsupported content types', async () => {
    const response = await handleConversionEvent(
      new Request('https://example.test/events/conversion', {
        method: 'POST',
        headers: {
          origin: 'https://example.test',
          'sec-fetch-site': 'same-origin',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: 'page_viewed' }),
      }),
    )

    expect(response.status).toBe(400)
  })
})
