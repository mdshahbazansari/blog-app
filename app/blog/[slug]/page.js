import '@/util/database'
import Slug from '@/components/Slug'
import React from 'react'

export const generateMetadata = ({ params }) => {
  return {
    title: `Blog - blog- ${params.slug}`,
  }
}

const SlugRoute = async ({ params }) => {
  const res = await fetch(`${process.env.SERVER}/api/blog/${params.slug}`)
  let allData = []

  if (res.ok) allData = await res.json()

  const blog = Array.isArray(allData) ? allData[0] : allData

  return <Slug title={params.slug} data={blog} />
}

export default SlugRoute

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.SERVER}/api/blog/slug-list`)
  let data = []
  if (res.ok) data = await res.json()
  return data.map((slug) => ({
    slug: slug,
  }))
}
