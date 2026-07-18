// oxlint-disable-next-line import/no-unassigned-import -- TanStack's build-time client-import guard.
import '@tanstack/solid-start/server-only'

type RequestHandler = () => Response | Promise<Response>

export async function observeRequest(
  request: Request,
  handle: RequestHandler,
  requestId: string = crypto.randomUUID(),
) {
  try {
    const response = await handle()
    const observedResponse = new Response(response.body, response)
    observedResponse.headers.set('x-request-id', requestId)

    console.log({
      event: 'request.completed',
      requestId,
      method: request.method,
      status: response.status,
    })

    return observedResponse
  } catch {
    console.error({
      event: 'request.failed',
      requestId,
      method: request.method,
    })

    return new Response(JSON.stringify({ error: 'Internal Server Error', requestId }), {
      status: 500,
      headers: {
        'cache-control': 'no-store',
        'content-type': 'application/json; charset=utf-8',
        'x-request-id': requestId,
      },
    })
  }
}
