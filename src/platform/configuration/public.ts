import * as v from 'valibot'

const PublicConfigurationSchema = v.object({
  appName: v.pipe(v.string(), v.nonEmpty()),
})

export const publicConfiguration = v.parse(PublicConfigurationSchema, {
  appName: import.meta.env.VITE_APP_NAME ?? 'OpenAPI Studio',
})
