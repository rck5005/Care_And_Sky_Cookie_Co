import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import './App.css'
import Header from './components/Header'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import { api } from './utilities'

function App() {
  const loaderData = useLoaderData()
  const [user, setUser] = useState(loaderData)
  const navigate = useNavigate()

  // const testConnection = async() =>{
  //   let response = await api.get("flavors/")
  //   console.log(response.data)
  // }

  // useEffect(()=>{
  //   testConnection()
  // },[])


  //ensures signed out members can only see login/signup pages
  //and ensures logged in members cannot see login/signup pages
  useEffect(()=>{
    let nullUserUrls = ['/login/', '/signup/']
    let nullAllowed = nullUserUrls.includes(location.pathname)
    // let aboutPage = location.pathname === '/about/';

    // if (location.pathname === aboutPage){
    //   navigate(aboutPage)
    // }

    if (user && nullAllowed){
      navigate('/about/')
    }
    else if (!user && !nullAllowed){
      navigate('/login/')
    }

  }, [location.pathname, user])

  return (
    <>
        <Helmet><title>Care and Sky Cookie Co</title></Helmet>
        <h1>Care and Sky Cookie Co</h1>
        <Header user = {user} setUser={setUser}/>
        <Container>
          <Outlet context={{user, setUser}}/>
        </Container>
    </>
  )
}

export default App
