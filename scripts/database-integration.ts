import { migrate } from 'drizzle-orm/libsql/migrator'

import { createDatabase } from '../src/platform/database/database'
import { deliveryProbes } from '../src/platform/database/schema'

const database = createDatabase({
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL ?? '',
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ?? '',
})

await migrate(database, { migrationsFolder: 'drizzle' })
await migrate(database, { migrationsFolder: 'drizzle' })

await database.insert(deliveryProbes).values({ id: 1, checkedAt: new Date(0).toISOString() })
const rows = await database.select().from(deliveryProbes)

if (rows.length !== 1) {
  throw new Error('Remote database integration query returned an unexpected result')
}

console.log('Remote Turso migration and integration query passed')
