import '@/util/database'
import BlogSchema from '@/schema/blogSchema'
import { NextResponse } from 'next/server'

export const GET = async () => {
    const titles = await BlogSchema.distinct('title')
    const slugs = titles.map((item)=>item.split(" ").join("-"))
    return NextResponse.json(slugs)
}


