const body = JSON.stringify({ status: 'ok' })

export function handleHealthRequest(request: Request) {
  const method = request.method.toUpperCase()

  if (method !== 'GET' && method !== 'HEAD') {
    return new Response(null, {
      status: 405,
      headers: { allow: 'GET, HEAD', 'cache-control': 'no-store' },
    })
  }

  return new Response(method === 'HEAD' ? null : body, {
    status: 200,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
    },
  })
}
