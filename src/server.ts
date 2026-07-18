import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

import { handleHealthRequest } from './features/health/health'
import { handleConversionEvent } from './features/marketing/conversion-event.server'
import { observeRequest } from './platform/observability/request-observability.server'

export default createServerEntry({
  async fetch(request) {
    return observeRequest(request, () => {
      if (new URL(request.url).pathname === '/health') {
        return handleHealthRequest(request)
      }

      if (new URL(request.url).pathname === '/events/conversion') {
        return handleConversionEvent(request)
      }

      return handler.fetch(request)
    })
  },
})
