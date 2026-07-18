import { createClient } from '@libsql/client/node'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'

import { deliveryProbes } from '../src/platform/database/schema'

const client = createClient({ url: ':memory:' })
const database = drizzle(client)

try {
  await migrate(database, { migrationsFolder: 'drizzle' })
  await migrate(database, { migrationsFolder: 'drizzle' })

  await database.insert(deliveryProbes).values({ id: 1, checkedAt: new Date(0).toISOString() })
  const rows = await database.select().from(deliveryProbes)

  if (rows.length !== 1) {
    throw new Error('Database smoke query returned an unexpected result')
  }

  console.log('Database migration and smoke query passed')
} finally {
  client.close()
}
