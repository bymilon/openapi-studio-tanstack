export type ChangeSeverity = 'breaking' | 'review'

export interface ContractChange {
  severity: ChangeSeverity
  code: string
  method?: string
  path?: string
  location: string
  message: string
}

export interface ComparisonResult {
  breaking: ContractChange[]
  review: ContractChange[]
}

type ObjectValue = Record<string, unknown>

const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const

function object(value: unknown): ObjectValue | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as ObjectValue)
    : undefined
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function localRef(document: ObjectValue, value: unknown): ObjectValue | undefined {
  const schema = object(value)
  const ref = schema?.['$ref']
  if (typeof ref !== 'string') return schema
  if (!ref.startsWith('#/')) return undefined

  let current: unknown = document
  for (const segment of ref.slice(2).split('/')) {
    current = object(current)?.[segment.replaceAll('~1', '/').replaceAll('~0', '~')]
  }
  return object(current)
}

function mediaSchemas(value: unknown): ObjectValue[] {
  const content = object(object(value)?.['content'])
  if (!content) return []
  return Object.values(content)
    .map((media) => object(media)?.['schema'])
    .map(object)
    .filter((schema): schema is ObjectValue => Boolean(schema))
}

function change(
  severity: ChangeSeverity,
  code: string,
  message: string,
  location: string,
  path?: string,
  method?: string,
): ContractChange {
  return {
    severity,
    code,
    message,
    location,
    ...(path ? { path } : {}),
    ...(method ? { method } : {}),
  }
}

function compareSchema(
  baseDocument: ObjectValue,
  revisionDocument: ObjectValue,
  baseValue: unknown,
  revisionValue: unknown,
  context: 'request' | 'response',
  location: string,
  path: string,
  method: string,
  changes: ContractChange[],
  seen: Set<string>,
) {
  const key = `${context}:${method}:${path}:${location}`
  if (seen.has(key)) return
  seen.add(key)

  const base = localRef(baseDocument, baseValue)
  const revision = localRef(revisionDocument, revisionValue)
  if (!base || !revision) {
    changes.push(
      change(
        'review',
        'unresolved-ref',
        'This schema uses a reference outside the supported local comparison boundary.',
        location,
        path,
        method,
      ),
    )
    return
  }

  const baseType = base['type']
  const revisionType = revision['type']
  if (baseType !== undefined && revisionType !== undefined && baseType !== revisionType) {
    changes.push(
      change(
        'breaking',
        'schema-type-changed',
        `Type changed from ${String(baseType)} to ${String(revisionType)}.`,
        location,
        path,
        method,
      ),
    )
    return
  }

  const baseProperties = object(base['properties']) ?? {}
  const revisionProperties = object(revision['properties']) ?? {}
  if (context === 'response') {
    for (const property of Object.keys(baseProperties)) {
      if (!(property in revisionProperties)) {
        changes.push(
          change(
            'breaking',
            'response-property-removed',
            `Response property "${property}" was removed.`,
            `${location}.properties.${property}`,
            path,
            method,
          ),
        )
      }
    }
  } else {
    const baseRequired = new Set(strings(base['required']))
    for (const property of strings(revision['required'])) {
      if (!baseRequired.has(property)) {
        changes.push(
          change(
            'breaking',
            'request-property-required',
            `Request property "${property}" is now required.`,
            `${location}.required`,
            path,
            method,
          ),
        )
      }
    }
  }

  for (const property of Object.keys(baseProperties)) {
    if (property in revisionProperties) {
      compareSchema(
        baseDocument,
        revisionDocument,
        baseProperties[property],
        revisionProperties[property],
        context,
        `${location}.properties.${property}`,
        path,
        method,
        changes,
        seen,
      )
    }
  }

  if (base['items'] && revision['items']) {
    compareSchema(
      baseDocument,
      revisionDocument,
      base['items'],
      revision['items'],
      context,
      `${location}.items`,
      path,
      method,
      changes,
      seen,
    )
  }
}

function parameters(pathItem: ObjectValue, operation: ObjectValue): ObjectValue[] {
  return [
    ...(Array.isArray(pathItem['parameters']) ? pathItem['parameters'] : []),
    ...(Array.isArray(operation['parameters']) ? operation['parameters'] : []),
  ]
    .map(object)
    .filter((item): item is ObjectValue => Boolean(item))
}

function securityKeys(document: ObjectValue, operation: ObjectValue): Set<string> {
  const value = operation['security'] ?? document['security']
  if (!Array.isArray(value)) return new Set()
  return new Set(value.flatMap((requirement) => Object.keys(object(requirement) ?? {})))
}

function compareOperation(
  baseDocument: ObjectValue,
  revisionDocument: ObjectValue,
  basePathItem: ObjectValue,
  revisionPathItem: ObjectValue,
  baseOperation: ObjectValue,
  revisionOperation: ObjectValue,
  path: string,
  method: string,
  changes: ContractChange[],
) {
  const baseParameters = new Map(
    parameters(basePathItem, baseOperation).map((parameter) => [
      `${String(parameter['in'])}:${String(parameter['name'])}`,
      parameter,
    ]),
  )
  for (const parameter of parameters(revisionPathItem, revisionOperation)) {
    const key = `${String(parameter['in'])}:${String(parameter['name'])}`
    const previous = baseParameters.get(key)
    if (parameter['required'] === true && previous?.['required'] !== true) {
      changes.push(
        change(
          'breaking',
          'required-parameter-added',
          `Required ${String(parameter['in'])} parameter "${String(parameter['name'])}" was added.`,
          `paths.${path}.${method}.parameters`,
          path,
          method,
        ),
      )
    }
  }

  const baseResponses = object(baseOperation['responses']) ?? {}
  const revisionResponses = object(revisionOperation['responses']) ?? {}
  for (const status of Object.keys(baseResponses).filter((code) => /^2\d\d$/.test(code))) {
    if (!(status in revisionResponses)) {
      changes.push(
        change(
          'breaking',
          'success-response-removed',
          `Successful response ${status} was removed.`,
          `paths.${path}.${method}.responses.${status}`,
          path,
          method,
        ),
      )
      continue
    }
    const baseSchemas = mediaSchemas(baseResponses[status])
    const revisionSchemas = mediaSchemas(revisionResponses[status])
    if (baseSchemas[0] && revisionSchemas[0]) {
      compareSchema(
        baseDocument,
        revisionDocument,
        baseSchemas[0],
        revisionSchemas[0],
        'response',
        `paths.${path}.${method}.responses.${status}`,
        path,
        method,
        changes,
        new Set(),
      )
    }
  }

  const baseRequestSchemas = mediaSchemas(baseOperation['requestBody'])
  const revisionRequestSchemas = mediaSchemas(revisionOperation['requestBody'])
  if (baseRequestSchemas[0] && revisionRequestSchemas[0]) {
    compareSchema(
      baseDocument,
      revisionDocument,
      baseRequestSchemas[0],
      revisionRequestSchemas[0],
      'request',
      `paths.${path}.${method}.requestBody`,
      path,
      method,
      changes,
      new Set(),
    )
  }

  const revisionSecurity = securityKeys(revisionDocument, revisionOperation)
  for (const scheme of securityKeys(baseDocument, baseOperation)) {
    if (!revisionSecurity.has(scheme)) {
      changes.push(
        change(
          'breaking',
          'security-scheme-removed',
          `Supported security scheme "${scheme}" was removed.`,
          `paths.${path}.${method}.security`,
          path,
          method,
        ),
      )
    }
  }
}

export function compareOpenApi(
  baseDocument: ObjectValue,
  revisionDocument: ObjectValue,
): ComparisonResult {
  const changes: ContractChange[] = []
  const basePaths = object(baseDocument['paths']) ?? {}
  const revisionPaths = object(revisionDocument['paths']) ?? {}

  for (const [path, basePathValue] of Object.entries(basePaths)) {
    const basePathItem = object(basePathValue) ?? {}
    const revisionPathItem = object(revisionPaths[path])
    for (const method of methods) {
      const baseOperation = object(basePathItem[method])
      if (!baseOperation) continue
      const revisionOperation = object(revisionPathItem?.[method])
      if (!revisionOperation) {
        changes.push(
          change(
            'breaking',
            'operation-removed',
            `${method.toUpperCase()} ${path} was removed.`,
            `paths.${path}.${method}`,
            path,
            method,
          ),
        )
        continue
      }
      compareOperation(
        baseDocument,
        revisionDocument,
        basePathItem,
        revisionPathItem ?? {},
        baseOperation,
        revisionOperation,
        path,
        method,
        changes,
      )
    }
  }

  return {
    breaking: changes.filter(({ severity }) => severity === 'breaking'),
    review: changes.filter(({ severity }) => severity === 'review'),
  }
}
