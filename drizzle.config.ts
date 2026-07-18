import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'turso',
  schema: './src/platform/database/schema.ts',
  out: './drizzle',
  strict: true,
  verbose: true,
})
