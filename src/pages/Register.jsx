import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const naviagate = useNavigate()
    const firebase  = useFirebase();
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const submitForm = async(e) => {
        e.preventDefault()
        const result = await firebase.signinUser(email, password)
        console.log("Successful", result)
    }
    useEffect(() => {
      if(firebase.loginUser){
        naviagate('/');
      }
    },[firebase,naviagate])
   

  return (
    <div className='container mt-4'>
      <Form onSubmit={submitForm}>
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
        Signup
      </Button>
      
   
    </Form>
    </div>
  )
}

export default Register

