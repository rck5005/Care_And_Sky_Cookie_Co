import React, { useState } from 'react'
import { signUp } from '../utilities';
import { useOutletContext } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useOutletContext()


  const handleSubmit = async(e) => {
    e.preventDefault()
    setUser(await signUp(email, password))
  }

  return (
    <>
    <div>SignUpPage</div>
    <form onSubmit={(e)=> handleSubmit(e)}>
        <input value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            type="email" 
            placeholder="name@domain.com"
            required
        />
        <input value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            type="password" 
            placeholder="enter password"
            required
        />
        <input type="submit" value="sign up"/>

    </form>

    </>
  )
}

export default SignUpPage