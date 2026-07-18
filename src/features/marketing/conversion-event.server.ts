// oxlint-disable-next-line import/no-unassigned-import -- TanStack's build-time client-import guard.
import '@tanstack/solid-start/server-only'

import * as v from 'valibot'

const ConversionEventSchema = v.strictObject({
  name: v.picklist(['page_viewed', 'design_partner_clicked', 'repository_clicked']),
})

export async function handleConversionEvent(request: Request) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { allow: 'POST' } })
  }

  if (
    request.headers.get('origin') !== new URL(request.url).origin ||
    request.headers.get('sec-fetch-site') !== 'same-origin'
  ) {
    return new Response(null, { status: 403 })
  }

  if (!request.headers.get('content-type')?.startsWith('text/plain')) {
    return new Response(null, { status: 400 })
  }

  const body = await readBoundedBody(request, 64)
  if (body === null) {
    return new Response(null, { status: 400 })
  }

  let input: unknown
  try {
    input = JSON.parse(body)
  } catch {
    return new Response(null, { status: 400 })
  }

  const event = v.safeParse(ConversionEventSchema, input)
  if (!event.success) {
    return new Response(null, { status: 400 })
  }

  console.log({ event: 'conversion.recorded', conversionName: event.output.name })
  return new Response(null, { status: 204 })
}

async function readBoundedBody(request: Request, limit: number) {
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > limit || !request.body) return null

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let body = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) return body + decoder.decode()

    size += value.byteLength
    if (size > limit) {
      await reader.cancel()
      return null
    }
    body += decoder.decode(value, { stream: true })
  }
}
