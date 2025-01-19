import { Card } from 'antd'
import React from 'react'

const Slug = ({ title, data }) => {
  console.log(data)
  return (
    <div>
      <Card hoverable className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-2xl font-semibold capitalize  text-gray-800 mb-4'>
          {title.split('-').join(' ')}
        </h2>
        <p>{data.description}</p>
      </Card>
    </div>
  )
}

export default Slug
