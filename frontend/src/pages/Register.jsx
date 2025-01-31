import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    role: z.enum(["user", "admin"]),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


const Register = () => {
    const navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}}=useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {

        try {
            const response = await axios.post('http://localhost:3000/user/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role
            });
            console.log(response.data);
            if(response.data && response.data.token){
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
       
    }
  return (
    <div>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <input type="text" placeholder='Name'  {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}

        <input type="email" placeholder='Email'  {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <select  {...register('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

        <input type="password" placeholder='Password' {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="password" placeholder='Confirm Password'  {...register('confirmPassword')}/>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register