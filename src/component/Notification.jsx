import React, { useEffect } from 'react'
import me from "../assets/me2.jpg"

const Notification = () => {

  return (
    <div className='notification' >
      <div>
        <div className='acc-img'>
          <img src={me} alt='Not Present' />    
        </div> 
        <div className='like-cmnt'>
            <h3>Sandeep Khariwal</h3>
           <p>Liked your post</p>   
        </div> 
        <div className='post-img'>
          <img src={me} alt='Not Present'/>     
        </div> 
      </div>
    </div>
  )
}

export default Notification
