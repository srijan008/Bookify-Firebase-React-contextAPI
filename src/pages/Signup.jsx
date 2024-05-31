import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const createUser = () => {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
                alert("Success");
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className='signup-page'>
            <h1>SignUp Page</h1>
            <label>Email</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder='Enter your email here' 
            />
            <br />
            <label>Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder='Enter your password here' 
            />
            <br />
            <button onClick={createUser}>Signup</button>
        </div>
    );
};

export default Signup;
