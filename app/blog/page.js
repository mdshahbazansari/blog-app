import Blog from '@/components/Blog'

export const metadata = {
  title: 'blog-blogPage',
}

export const revalidate = 43200

const BlogPage = async () => {
  const blog = await fetch('http://localhost:3000/api/blog')
  let data = []
  if (blog.ok) data = await blog.json()
  return <Blog data={data} />
}

export default BlogPage
