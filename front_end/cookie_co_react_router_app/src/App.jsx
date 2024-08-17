import { useState } from 'react'
import { Helmet } from 'react-helmet'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Helmet><title>Care and Sky Cookie Co</title></Helmet>
        <h1>Care and Sky Cookie Co</h1>
        <Header/>
        <Container>
          <Outlet/>
        </Container>
    </>
  )
}

export default App
