import Home from '@/components/Home'
import '@/util/database'

export const metadata = {
  title: 'blog-Homepage',
}

const HomeRoute = async () => {
  const blog = await fetch('http://localhost:3000/api/blog')
  const data = await blog.json()
  return <Home data={data} />
}

export default HomeRoute
