import React, { useState } from 'react'
import { signUp } from '../utilities';
import { useOutletContext } from 'react-router-dom';
import { subscribeToMailChimp, unsubscribeFromMailChimp } from '../utilities';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [address, setAddress] = useState('');

  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [purchaseEmailsOptIn, setPurchaseEmailsOptIn] = useState(true);

  const {setUser} = useOutletContext()


  const handleSubmit = async(e) => {
    e.preventDefault()

    setUser(await signUp(email, firstName, lastName, password, displayName, address))

    if (!purchaseEmailsOptIn) {
      alert('You must acknowledge you will receive emails regarding your purchases to sign up.');
      return;
    }

    await subscribeToMailChimp(email, firstName, lastName);

    if (!newsletterOptIn) {
      console.log("inside trying to unsubscribe")
      await unsubscribeFromMailChimp(email);
    }

    if (password != confirmPassword) {
      alert("Your passwords did not match, please try again.")
      return;
    } 

  }

  return (
    <>
    <h1>Sign-Up Here!</h1>
    <form onSubmit={(e)=> handleSubmit(e)}>
        <div className ="mb-3">
            <label htmlFor="email" className ="form-label">Email address</label>
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
            <label htmlFor="firstName" className ="form-label">First Name</label>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className ="form-control"
                id="firstName"
                placeholder="Enter your first name"
                required
            />
        </div>

        <div className ="mb-3">
            <label htmlFor="lastName" className ="form-label">Last Name</label>
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className ="form-control"
                id="lastName"
                placeholder="Enter your last name"
                required
            />
        </div>

        <div className ="mb-3">
            <label htmlFor="password" className ="form-label">Password</label>
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

        <div className ="mb-3">
                <label htmlFor="confirmpassword" className ="form-label">Confirm Password</label>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className ="form-control"
                    id="password"
                    placeholder="Confirm password"
                    required
                />
            </div>

        <div className ="mb-3">
            <label htmlFor="displayName" className ="form-label">Desired Display Name</label>
            <input 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                type="text" 
                className ="form-control" 
                id="displayName" 
                placeholder="Optional: Enter name. Otherwise will be your e-mail." 
            />
        </div>

        <div className ="mb-3">
            <label htmlFor="address" className ="form-label">Address</label>
            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className ="form-control"
                id="address"
                placeholder="Optional: Enter address"
            />
        </div>


        <div className ="form-check">
                <input
                    className ="form-check-input"
                    type="checkbox"
                    id="newsletterOptIn"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                />
                <label className ="form-check-label" htmlFor ="newsletterOptIn">
                    Sign me up for the Newsletter!
                </label>
            </div>

            <div className ="form-check">
                <input
                    className ="form-check-input"
                    type="checkbox"
                    id="purchaseEmailsOptIn"
                    checked={purchaseEmailsOptIn}
                    onChange={(e) => setPurchaseEmailsOptIn(e.target.checked)}
                />
                <label className ="form-check-label" htmlFor ="purchaseEmailsOptIn">
                    I understand I will automatically recieve e-mails regarding my active orders.
                </label>
            </div>



        <input type="submit" value="sign up"/>

    </form>

    </>
  )
}

export default SignUpPage