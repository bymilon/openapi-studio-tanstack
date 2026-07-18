import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

import { handleHealthRequest } from './features/health/health'

export default createServerEntry({
  fetch(request) {
    if (new URL(request.url).pathname === '/health') {
      return handleHealthRequest(request)
    }

    return handler.fetch(request)
  },
})
