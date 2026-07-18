import { afterEach, describe, expect, it, vi } from 'vitest'

import { observeRequest } from './request-observability.server'

afterEach(() => vi.restoreAllMocks())

describe('request observability', () => {
  it('correlates a response without logging query values or headers', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const request = new Request('https://example.test/secret-value?token=secret-value', {
      headers: { authorization: 'Bearer secret-value' },
    })

    const response = await observeRequest(
      request,
      () => new Response(null, { status: 204 }),
      'id-1',
    )

    expect(response.headers.get('x-request-id')).toBe('id-1')
    expect(log).toHaveBeenCalledWith({
      event: 'request.completed',
      requestId: 'id-1',
      method: 'GET',
      status: 204,
    })
    expect(JSON.stringify(log.mock.calls)).not.toContain('secret-value')
  })

  it('contains sensitive failures at the Worker boundary', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const response = await observeRequest(
      new Request('https://example.test/secret-path'),
      () => {
        throw new Error('sensitive failure detail')
      },
      'id-2',
    )

    expect(log).toHaveBeenCalledWith({
      event: 'request.failed',
      requestId: 'id-2',
      method: 'GET',
    })
    expect(response.status).toBe(500)
    expect(response.headers.get('x-request-id')).toBe('id-2')
    await expect(response.json()).resolves.toEqual({
      error: 'Internal Server Error',
      requestId: 'id-2',
    })
    expect(JSON.stringify(log.mock.calls)).not.toContain('sensitive failure detail')
    expect(JSON.stringify(log.mock.calls)).not.toContain('secret-path')
  })
})
