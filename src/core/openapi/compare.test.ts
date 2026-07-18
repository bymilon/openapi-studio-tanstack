import { describe, expect, it } from 'vitest'

import { compareOpenApi } from './compare'

const operation = {
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: { id: { type: 'string' }, dueDate: { type: 'string' } },
          },
        },
      },
    },
  },
}

function document(nextOperation: Record<string, unknown> = operation) {
  return { openapi: '3.1.0', paths: { '/invoices/{id}': { get: nextOperation } } }
}

describe('compareOpenApi', () => {
  it('reports the supported high-confidence breaking changes', () => {
    const revision = document({
      parameters: [{ in: 'query', name: 'expand', required: true, schema: { type: 'string' } }],
      security: [{ oauth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: { email: { type: 'string' } },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { id: { type: 'number' } } },
            },
          },
        },
      },
    })
    const base = document({
      ...operation,
      security: [{ apiKey: [] }, { oauth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: { email: { type: 'string' } },
            },
          },
        },
      },
    })

    expect(compareOpenApi(base, revision).breaking.map(({ code }) => code)).toEqual([
      'required-parameter-added',
      'response-property-removed',
      'schema-type-changed',
      'request-property-required',
      'security-scheme-removed',
    ])
  })

  it('reports removed operations and successful responses', () => {
    expect(compareOpenApi(document(), { openapi: '3.1.0', paths: {} }).breaking[0]?.code).toBe(
      'operation-removed',
    )
    expect(
      compareOpenApi(document(), document({ responses: { '404': { description: 'Missing' } } }))
        .breaking[0]?.code,
    ).toBe('success-response-removed')
  })

  it('reports removed response properties', () => {
    const result = compareOpenApi(
      document(),
      document({
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { id: { type: 'string' } } },
              },
            },
          },
        },
      }),
    )

    expect(result.breaking.map(({ code }) => code)).toContain('response-property-removed')
  })

  it('does not claim a breaking change for identical contracts', () => {
    expect(compareOpenApi(document(), document())).toEqual({ breaking: [], review: [] })
  })
})
