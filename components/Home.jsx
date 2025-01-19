'use client'
import { Card } from 'antd'
import React from 'react'

const Home = ({ data }) => {

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Welcome to the Blog
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data &&
          data.map((item, index) => (
            <Card
              hoverable
              key={index}
              className='bg-white p-6 rounded-lg shadow'
            >
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                {item.title}
              </h2>
              <p className='text-gray-600 mb-4'>
                {item.description.slice(0, 150)}...
              </p>
              <a href='#' className='text-blue-500 hover:text-blue-700'>
                Read More
              </a>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default Home
