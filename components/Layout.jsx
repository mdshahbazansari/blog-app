'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact-us',
    href: '/contactUs',
  },
]

const Layout = ({ children }) => {
  const pathname = usePathname()

  const blackList = ['/login', '/signup', '/admin']

  const isBlackList = blackList.includes(pathname)
  if (isBlackList) return <div>{children}</div>

  return (
    <div>
      <nav className='flex justify-between items-center w-full px-[10%] py-4 shadow-md bg-white'>
        <Link href='/' className='text-2xl font-bold'>
          Blog
        </Link>
        <div className='flex gap-8 items-center'>
          {menus.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={
                pathname === item.href
                  ? 'font-semibold border-b-2 border-gray-600'
                  : 'font-normal'
              }
            >
              {item.label}
            </Link>
          ))}

          <Link
            href='/login'
            className='font-semibold text-white bg-indigo-600 px-8 py-1.5 rounded'
          >
            Login
          </Link>
        </div>
      </nav>
      <div className='m-4'>{children}</div>
      <footer className='bg-gray-600 px-8 py-10'>
        <div className='container mx-auto text-white'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <h1 className='text-3xl font-semibold mb-4 sm:mb-0'>Blog Footer</h1>
            <div className='flex gap-4'>
              <a href='#' className='text-lg hover:text-gray-400'>
                Home
              </a>
              <a href='#' className='text-lg hover:text-gray-400'>
                About
              </a>
              <a href='#' className='text-lg hover:text-gray-400'>
                Contact
              </a>
              <a href='#' className='text-lg hover:text-gray-400'>
                Privacy Policy
              </a>
            </div>
          </div>
          <div className='mt-6 text-center'>
            <p className='text-sm'>
              &copy; {new Date().getFullYear()} Your Blog Name. All rights
              reserved.
            </p>
          </div>
          <div className='mt-4 text-center'>
            <a href='#' className='text-xl mx-2 hover:text-gray-400'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='#' className='text-xl mx-2 hover:text-gray-400'>
              <i className='fab fa-twitter'></i>
            </a>
            <a href='#' className='text-xl mx-2 hover:text-gray-400'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className='text-xl mx-2 hover:text-gray-400'>
              <i className='fab fa-linkedin-in'></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
