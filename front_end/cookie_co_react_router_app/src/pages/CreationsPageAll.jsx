import React, { useState, useEffect } from 'react'
import { CreationsList } from '../components/Lists'

function CreationsPageAll() {



  return (
    <div>CreationsPageAll
      
      <CreationsList />
      
    </div>
  )
}

//     const [cookieCreations, setCookieCreations] = useState([])

//     useEffect(() => {
//         const getCookieCreations = async() => {
//             let response = await api.get("cookiecreations/all/")
//             setCookieCreations(response.data)

//         }

//         getCookieCreations()
        
//     }, [])

//     // useEffect(() => {
//     //   console.log(cookieCreations[0]);  // Logging the updated state
//     //   console.log(cookieCreations[1]);  // Logging the updated state
//     // }, [cookieCreations]);  // Dependency array to log whenever cookieCreations is updated


//   return (
//     <>
//     <div>CreationsPageAll</div>
// <div> 
//     {cookieCreations.length === 0 ?
//     (
//       <h3>No Cookie Creations Available Yet</h3>
//     ) : (
//           cookieCreations.map((creation) => (
//             <ItemCard
//                 key={creation.id}
//                 id={creation.id}
//                 name={creation.name}
//                 description={creation.description}
//                 image={creation.image}
//             />
//           )
//         )
//     )
//   } </div>
//     </>
//   )
//}

export default CreationsPageAll