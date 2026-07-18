import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

import { handleHealthRequest } from './features/health/health'
import { observeRequest } from './platform/observability/request-observability.server'

export default createServerEntry({
  async fetch(request) {
    return observeRequest(request, () => {
      if (new URL(request.url).pathname === '/health') {
        return handleHealthRequest(request)
      }

      return handler.fetch(request)
    })
  },
})
