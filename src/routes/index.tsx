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
          'A design-partner pilot for small teams building a dependable OpenAPI contract workflow.',
      },
    ],
  }),
})
