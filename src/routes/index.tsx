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
          'A public demand-validation build for making consequential OpenAPI contract changes reviewable.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'OpenAPI Studio' },
      { property: 'og:title', content: 'OpenAPI Studio — Contract changes, made reviewable' },
      {
        property: 'og:description',
        content:
          'A public demand-validation build for reviewing consequential OpenAPI contract changes.',
      },
      {
        property: 'og:url',
        content: 'https://openapi-studio-tanstack-preview.pibin.workers.dev',
      },
      {
        property: 'og:image',
        content:
          'https://openapi-studio-tanstack-preview.pibin.workers.dev/og/openapi-studio-og.png',
      },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content: 'OpenAPI Studio — Contract changes, made reviewable',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'OpenAPI Studio — Contract changes, made reviewable' },
      {
        name: 'twitter:description',
        content:
          'A public demand-validation build for reviewing consequential OpenAPI contract changes.',
      },
      {
        name: 'twitter:image',
        content:
          'https://openapi-studio-tanstack-preview.pibin.workers.dev/og/openapi-studio-og.png',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://openapi-studio-tanstack-preview.pibin.workers.dev',
      },
    ],
  }),
})
