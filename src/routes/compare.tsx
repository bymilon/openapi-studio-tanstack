import { createFileRoute } from '@tanstack/solid-router'

import { ContractChangeCheck } from '../features/contract-change/contract-change-check'

export const Route = createFileRoute('/compare')({
  component: ContractChangeCheck,
  head: () => ({
    meta: [
      { title: 'OpenAPI change check | OpenAPI Studio' },
      {
        name: 'description',
        content: 'Compare two local OpenAPI contracts for high-confidence breaking changes.',
      },
    ],
  }),
})
