import { NextResponse as res } from 'next/server'

export const config = {
  matcher: '/admin/:path*',
}

export const middleware = async (request) => {
  const cookies = request.cookies.get('accessToken')

  if (!cookies) return res.redirect(new URL('/login', request.url))

  const apiResponse = await fetch(`${process.env.SERVER}/api/session`, {
    method: 'post',
    body: JSON.stringify({ token: cookies.value }),
    headers: {
      'content-Type': 'application/json',
    },
  })

  if (!apiResponse.ok) return res.redirect(new URL('/login', request.url))

  const body = await apiResponse.json()
  const result = res.next()
  result.cookies.set('session', JSON.stringify(body), { MaxAge: '30d' })
  return result
}
