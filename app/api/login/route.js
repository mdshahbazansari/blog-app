import '@/util/database'
import { NextResponse as res } from 'next/server'
import UserSchema from '@/schema/userSchema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })

  return { accessToken, refreshToken }
}

export const POST = async (request) => {
  try {
    const { email, password } = await request.json()
    const user = await UserSchema.findOne({ email })

    if (!user)
      return res.json(
        { success: false, message: 'User not find' },
        { status: 404 }
      )

    const isUser = await bcrypt.compare(password, user.password)

    if (!isUser)
      return res.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      )

    const token = getToken({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    })

    const result = res.json(
      { success: true, message: 'Login success' },
      { status: 200 }
    )
    result.cookies.set('accessToken', token.accessToken, {
      httpOnly: true,
      secure: process.env.PROD === 'true' ? true : false,
      path: '/',
    })
    result.cookies.set('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: process.env.PROD === 'true' ? true : false,
      path: '/',
    })

    return result
  } catch (err) {
    console.log(err.message)
    return res.json({ success: false, message: err.message }, { status: 500 })
  }
}
