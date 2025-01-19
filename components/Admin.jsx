'use client'
import { Button, Card, Form, Input, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const Admin = () => {
  const [currentId, setCurrentId] = useState(null)
  const { data } = useSWR('/api/blog', fetcher)
  const [form] = Form.useForm()

  const createBlog = async (values) => {
    try {
      await axios.post('/api/blog', values, {
        'Content-Type': 'application/json',
      })
      mutate('/api/blog')
      form.resetFields()
    } catch (err) {
      message.error(err.response.data.message || err.message)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blog/${id}`)
      mutate('/api/blog')
    } catch (err) {
      message.error(err.response.data.message || err.message)
    }
  }

  const editBlog = async (item) => {
    form.setFieldsValue(item)
    setCurrentId(item._id)
  }

  const updateBlog = async (values) => {
    try {
      await axios.put(`/api/blog/${currentId}`, values, {
        'Content-Type': 'application/json',
      })
      mutate('/api/blog')
      setCurrentId(null)
      form.resetFields()
    } catch (err) {
      message.error(err.response.data.message || err.message)
    }
  }

  return (
    <div className='flex gap-4 p-4'>
      {/* Form Section */}
      <div className='w-full sticky lg:w-5/12'>
        <h1 className='text-2xl font-medium mb-4'>New Blog</h1>
        <Form
          layout='vertical'
          onFinish={currentId ? updateBlog : createBlog}
          form={form}
        >
          <Form.Item label='Title' name='title' rules={[{ required: true }]}>
            <Input size='large' placeholder='Enter Blog title' />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }]}
          >
            <Input.TextArea
              size='large'
              placeholder='Blog Description'
              rows={6}
            />
          </Form.Item>

          {currentId ? (
            <Form.Item>
              <Button size='large' danger type='primary' htmlType='submit'>
                Update
              </Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <Button size='large' type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>

      {/* Blog Cards Section */}
      <div className='w-full lg:w-7/12 flex flex-wrap gap-4'>
        {data &&
          data.map((item, index) => (
            <Card
              key={index}
              hoverable
              actions={[
                <EditOutlined key='edit' onClick={() => editBlog(item)} />,
                <DeleteOutlined
                  key='delete'
                  onClick={() => deleteBlog(item._id)}
                />,
              ]}
              className='w-full md:w-[calc(50%-1rem)] lg:w-full p-4 shadow-md'
            >
              <h1 className='text-xl font-semibold capitalize mb-2'>
                {item.title}
              </h1>
              <p className='text-gray-600'>{item.description}</p>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default Admin
