import React from 'react'
import { useLocation } from 'react-router-dom'
import Like from './Like'

const Likes = () => {
    const location = useLocation()
    const {likes} = location.state
    const allLikes = Object.keys(likes);
  return (
    <div className='likes'>
        <h3>Likes</h3>
     {
        allLikes && allLikes.map((id)=>(
           <Like id={id}/> 
        ))
     }
      
    </div>
  )
}

export default Likes
