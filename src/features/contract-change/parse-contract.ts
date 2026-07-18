import { parseDocument } from 'yaml'

export type OpenApiDocument = Record<string, unknown>

export class ContractParseError extends Error {}

export function parseContract(source: string): OpenApiDocument {
  const parsed = parseDocument(source, { logLevel: 'error' })
  if (parsed.errors.length > 0) {
    throw new ContractParseError(
      parsed.errors[0]?.message ?? 'The contract is not valid JSON or YAML.',
    )
  }

  const value: unknown = parsed.toJS({ maxAliasCount: 50 })
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new ContractParseError('The contract root must be an object.')
  }
  const document = value as OpenApiDocument
  if (typeof document['openapi'] !== 'string' || !/^3\.\d+\.\d+/.test(document['openapi'])) {
    throw new ContractParseError('Use an OpenAPI 3.x document with an openapi version field.')
  }
  if (
    typeof document['paths'] !== 'object' ||
    document['paths'] === null ||
    Array.isArray(document['paths'])
  ) {
    throw new ContractParseError('The contract must contain a paths object.')
  }
  return document
}
