import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const deliveryProbes = sqliteTable('delivery_probes', {
  id: integer().primaryKey(),
  checkedAt: text('checked_at').notNull(),
})
