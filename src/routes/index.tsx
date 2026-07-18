import { createFileRoute } from '@tanstack/solid-router'

import { MarketingHome } from '../features/marketing/marketing-home'

export const Route = createFileRoute('/')({ component: MarketingHome })
