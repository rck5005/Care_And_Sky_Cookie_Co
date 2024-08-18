import React, { useState } from 'react'
import { signIn } from '../utilities';
import { useOutletContext } from 'react-router-dom';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useOutletContext()


  const handleSubmit = async(e) => {
    e.preventDefault()
    setUser(await signIn(email, password))
  }

  return (
    <>
    <div>LoginPage</div>
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
        <input type="submit" value="log in"/>

    </form>

    </>
  )
}

export default LogInPage