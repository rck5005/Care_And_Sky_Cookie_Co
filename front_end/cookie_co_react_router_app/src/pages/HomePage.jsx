import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HomePage() {
  const {user} = useOutletContext()

  return (
    
    <div>HomePage {user}
    </div>
  )
}

export default HomePage