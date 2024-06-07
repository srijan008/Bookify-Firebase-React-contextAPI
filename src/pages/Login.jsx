import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const naviagate = useNavigate()
    const firebase  = useFirebase();
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    useEffect(() => {
      if(firebase.loginUser){
        naviagate('/');
      }
    },[firebase,naviagate])
    const loginForm = async(e) => {
        e.preventDefault()
        const result = await firebase.signinUser(email, password)
        console.log("Successful", result)
    }
    const handleGoogleLogin = async () => {
      const result = await firebase.googleLogin();
      console.log("Google Signin Successful", result);
  }
  return (
    <div>
      <Form onSubmit={loginForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => (setEmail(e.target.value))} value={email}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} value={password}/>
      </Form.Group>      
      <Button variant="primary" type="submit">
        Log In
      </Button>
      <h1 className = "mt-5 mb-5" type="submit">
        OR
      </h1>
      <Button variant='primary' onClick={ handleGoogleLogin }>
        Signin with Google
      </Button>
    </Form>
    </div>
  )
}

export default Login
