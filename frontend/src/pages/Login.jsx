import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      });
      console.log(response.data);
      if (response.data && response.data.token) { 
        navigate('/');
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginButton}>Login</button>
    </div>
  )
}

export default Login

