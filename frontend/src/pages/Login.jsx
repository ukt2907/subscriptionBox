import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'


const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
const Login = () => {
  const navigate = useNavigate();
  const [errormessage, seterrormessage] = useState('')

const {register, handleSubmit, formState:{errors}}=useForm({
  resolver: zodResolver(schema)
})

  const loginButton = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email: data.email,
        password: data.password
      });
      console.log(response.data);
      if (response.data && response.data.token) { 
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      seterrormessage("invalid credentials")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(loginButton)}>
        <input type="text" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password"  placeholder='Password' {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type='submit'>Login</button>
        {errormessage && <p>{errormessage}</p>}
      </form>
      
    </div>
  )
}

export default Login


