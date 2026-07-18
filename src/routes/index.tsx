import { createFileRoute } from '@tanstack/solid-router'

import { MarketingHome } from '../features/marketing/marketing-home'

export const Route = createFileRoute('/')({
  component: MarketingHome,
  head: () => ({
    meta: [
      { title: 'OpenAPI Studio — Dependable OpenAPI workflows' },
      {
        name: 'description',
        content:
          'Edit, review, and publish OpenAPI contracts without YAML mistakes or documentation drift.',
      },
    ],
  }),
})
