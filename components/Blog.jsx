'use client'
import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'

const Blog = ({ data }) => {
  return (
    <div>
      <div className='container mx-auto px-4 py-10'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          Welcome to the Blog
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data.map((item, index) => (
            <Link key={index} href={`/blog/${item.title.split(' ').join('-')}`}>
              <Card hoverable className='bg-white p-6 rounded-lg shadow'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                  {item.title}
                </h2>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
