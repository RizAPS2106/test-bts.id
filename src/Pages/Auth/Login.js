import './Auth.css'
import React, { useRef } from 'react'
import AuthUser from '../../config/AuthUser'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { AxiosAuth, setToken } = AuthUser()

  const form = useRef()

  const onSubmit = (data) => {
    AxiosAuth.post('/login', {username:data.username, password:data.password})
    .then(res => {
      let response = res.data

      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay',
      }).then(() => {
        setToken(response.data.token)
      })
    },error => {
      let errorResponse = error.response.data
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorResponse.errorMessage,
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay',
      })
    })
  }

  
  return (
    <section className='form-auth'> 
      <Form ref={form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center'>Login</h1>

        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' {...register('username', { required: true })}  />
          {errors.username && <small className='text-danger'>Fill Username field</small>}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' {...register('password', { required: true })}  />
          {errors.password && <small className='text-danger'>Fill Password field</small>}
        </Form.Group>

        <div className='submit-auth'>
          <Button type='submit' variant='dark'>Login</Button>
          <Link to='/register'>Register Here</Link>
        </div>
      </Form>
    </section>
  )
}

export default Login