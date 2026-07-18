// oxlint-disable-next-line import/no-unassigned-import -- TanStack's build-time client-import guard.
import '@tanstack/solid-start/server-only'

import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import * as v from 'valibot'

import * as schema from './schema'

const DatabaseConfigurationSchema = v.object({
  url: v.pipe(v.string(), v.nonEmpty()),
  authToken: v.pipe(v.string(), v.nonEmpty()),
})

export interface DatabaseEnvironment {
  TURSO_AUTH_TOKEN: string
  TURSO_DATABASE_URL: string
}

export function createDatabase(environment: DatabaseEnvironment) {
  const configuration = v.parse(DatabaseConfigurationSchema, {
    url: environment.TURSO_DATABASE_URL,
    authToken: environment.TURSO_AUTH_TOKEN,
  })

  const client = createClient(configuration)

  return drizzle(client, { schema })
}
