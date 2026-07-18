import { describe, expect, it } from 'vitest'

import { createDatabase } from './database'

describe('database configuration', () => {
  it('fails before connecting when credentials are missing', () => {
    expect(() =>
      createDatabase({
        TURSO_DATABASE_URL: '',
        TURSO_AUTH_TOKEN: '',
      }),
    ).toThrow(/Invalid length/)
  })
})
