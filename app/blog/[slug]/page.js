import '@/util/database'
import Slug from '@/components/Slug'
import React from 'react'

export const generateMetadata = ({ params }) => {
  return {
    title: `Blog - blog- ${params.slug}`,
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const SlugRoute = async ({ params }) => {
  let allData = []

  try {
    const res = isProduction
      ? await fetch(`${process.env.SERVER}/api/blog/${params.slug}`)
      : await fetch(`http://localhost:3000/api/blog/${params.slug}`) // fallback to localhost for development

    if (res.ok) {
      allData = await res.json()
    } else {
      console.error('Error fetching blog data:', res.statusText)
    }
  } catch (error) {
    console.error('Error during fetch:', error)
  }

  const blog = Array.isArray(allData) ? allData[0] : allData
  if (!blog) {
    return <div>Blog not found</div>
  }

  return <Slug title={params.slug} data={blog} />
}

export default SlugRoute

export const generateStaticParams = async () => {
  let data = []

  try {
    const res = isProduction
      ? await fetch(`${process.env.SERVER}/api/blog/slug-list`)
      : await fetch('http://localhost:3000/api/blog/slug-list') // fallback to localhost for development

    if (res.ok) {
      data = await res.json()
    } else {
      console.error('Error fetching slug list:', res.statusText)
    }
  } catch (error) {
    console.error('Error during fetch:', error)
  }

  console.log('Generated slugs:', data)
  return data.map((slug) => ({
    slug: slug,
  }))
}
