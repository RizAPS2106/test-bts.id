import './Auth.css'
import React, { useRef } from 'react'
import AuthUser from '../../config/AuthUser'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { AxiosAuth, getToken } = AuthUser()
    
  const form = useRef()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    AxiosAuth.post('/register', {email:data.email ,username:data.username, password:data.password})
    .then(res => {
      let response = res.data

      Swal.fire({
        icon: 'success',
        title: 'Registration Success',
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay',
      }).then(() => {
        navigate('/')
      })
    },error => {
      let errorResponse = error.response.data

      Swal.fire({
        icon: 'error',
        title: errorResponse.message,
        text: errorResponse.errorMessage,
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay',
      })
    })
  }

  if(getToken()) {
    return navigate('/')
  }  
  
  return (
    <section className='form-auth'> 
      <Form ref={form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center'>Register</h1>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' {...register('email', { required: true })}  />
          {errors.username && <small className='text-danger'>Fill Email field</small>}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' {...register('username', { required: true })}  />
          {errors.username && <small className='text-danger'>Fill Username field</small>}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' {...register('password', { required: true })}  />
          {errors.password && <small className='text-danger'>Fill Password field</small>}
        </Form.Group>
        <div className='submit-auth'>
          <Button type='submit' variant='dark'>Register</Button>
          <Link to='/'>Login Here</Link>
        </div>
      </Form>
    </section>
  )
}

export default Register