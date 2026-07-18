import { describe, expect, it } from 'vitest'

import { ContractParseError, parseContract } from './parse-contract'

describe('parseContract', () => {
  it('parses JSON and YAML OpenAPI 3 documents', () => {
    expect(parseContract('{"openapi":"3.1.0","paths":{}}')['openapi']).toBe('3.1.0')
    expect(parseContract('openapi: 3.0.4\npaths: {}')['openapi']).toBe('3.0.4')
  })

  it('rejects malformed and unsupported documents', () => {
    expect(() => parseContract('openapi: [')).toThrow(ContractParseError)
    expect(() => parseContract('swagger: "2.0"\npaths: {}')).toThrow('OpenAPI 3.x')
    expect(() => parseContract('openapi: 3.1.0')).toThrow('paths object')
  })
})
