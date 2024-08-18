import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import './App.css'
import Header from './components/Header'
import { Outlet, useLoaderData } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import { api } from './utilities'

function App() {
  const [user, setUser] = useState(useLoaderData)

  // const testConnection = async() =>{
  //   let response = await api.get("flavors/")
  //   console.log(response.data)
  // }

  // useEffect(()=>{
  //   testConnection()
  // },[])

  return (
    <>
        <Helmet><title>Care and Sky Cookie Co</title></Helmet>
        <h1>Care and Sky Cookie Co</h1>
        <Header setUser={setUser}/>
        <Container>
          <Outlet context={{user, setUser}}/>
        </Container>
    </>
  )
}

export default App
