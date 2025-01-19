import '@/util/database'
import BlogSchema from '@/schema/blogSchema'
import { NextResponse } from 'next/server'

// Handle POST request
export const POST = async (request) => {
  try {
    const body = await request.json()
    const blog = new BlogSchema(body)
    await blog.save()

    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}

// Handle GET request
export const GET = async () => {
  try {
    const blogs = await BlogSchema.find().sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}
