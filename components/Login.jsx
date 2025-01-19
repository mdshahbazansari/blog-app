'use client'
import { Button, Card, Form, Input, message } from 'antd'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const login = (values) => {
    try {
      axios.post('/api/login', values, { 'content-Type': 'aplication/json' })
      router.push('/admin')
    } catch (err) {
      message.error(err.response.data.message || err.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-200'>
      <Card hoverable className='w-3/12'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Login</h1>
        <Form layout='vertical' onFinish={login}>
          <Form.Item label='Email' name='email' rules={[{ required: true }]}>
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            type='password'
            rules={[{ required: true }]}
          >
            <Input type='password' size='large' />
          </Form.Item>
          <Form.Item>
            <Button
              className='w-full font-semibold'
              size='large'
              htmlType='submit'
              style={{
                backgroundColor: '#003cff',
                color: 'white',
                fontWeight: 'bolder',
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className='text-[16px] font-medium'>
          <label>Don't have an account </label>
          <Link href='/signup' className='font-semibold px-2 text-blue-700'>
            Create account
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login
