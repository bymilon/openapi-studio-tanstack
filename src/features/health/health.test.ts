import { describe, expect, it } from 'vitest'

import { handleHealthRequest } from './health'

describe('health response', () => {
  it('returns only public service status', async () => {
    const response = handleHealthRequest(new Request('https://example.test/health'))

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    await expect(response.json()).resolves.toEqual({ status: 'ok' })
  })

  it('supports probes without a response body', async () => {
    const response = handleHealthRequest(
      new Request('https://example.test/health', { method: 'HEAD' }),
    )

    expect(response.status).toBe(200)
    expect(await response.text()).toBe('')
  })

  it('rejects unsupported methods', () => {
    const response = handleHealthRequest(
      new Request('https://example.test/health', { method: 'POST' }),
    )

    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('GET, HEAD')
  })
})
