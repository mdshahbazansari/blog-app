import { NextResponse as res } from 'next/server'
import BlogSchema from '@/schema/blogSchema'
import '@/util/database'
import mongoose from 'mongoose'

export const PUT = async (request, { params }) => {
  try {
    const body = await request.json()
    const blog = await BlogSchema.findByIdAndUpdate(params.id, body, {
      new: true,
    })

    if (!blog)
      return res.json(
        { success: false, message: 'id does not exist' },
        { status: 404 }
      )

    return res.json(blog, { message: 'Blog Updated ' })
  } catch (err) {
    return res.json({ success: false, message: err.message }, { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const blog = await BlogSchema.findByIdAndDelete(params.id)

    if (!blog)
      return res.json(
        { success: false, message: 'Blog Id does not match' },
        { status: 404 }
      )

    return res.json({ success: true, message: 'Blog Deleted !' })
  } catch (err) {
    return res.json({ success: false, message: err.message }, { status: 500 })
  }
}

export const isId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

export const GET = async (request, { params }) => {
  try {
    const id = isId(params.id)

    const query = id
      ? { _id: params.id }
      : { title: params.id.split('-').join(' ') }

    const blog = await BlogSchema.find(query)

    if (!blog)
      return res.json(
        { success: false, message: 'Blog does not match' },
        { status: 404 }
      )

    return res.json(blog)
  } catch (err) {
    return res.json({ success: false, message: err.message }, { status: 500 })
  }
}
