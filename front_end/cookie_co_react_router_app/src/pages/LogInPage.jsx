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
    <h1>LoginPage</h1>
    <form onSubmit={handleSubmit}>
            <div className ="mb-3">
                <label htmlFor ="email" className ="form-label">Email address</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    className ="form-control" 
                    id="email" 
                    placeholder="name@domain.com" 
                    required 
                />
            </div>

            <div className ="mb-3">
                <label htmlFor ="password" className ="form-label">Password</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    className ="form-control" 
                    id="password" 
                    placeholder="Enter password" 
                    required 
                />
            </div>

            <button type="submit" className ="btn btn-primary">Log In</button>
        </form>

    </>
  )
}

export default LogInPage