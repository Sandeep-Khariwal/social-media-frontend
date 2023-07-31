import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const Friend = ({item}) => {
  const navigate = useNavigate()
  let [color, setColor] = useState("#b766f5");
  return (
    <div className='friend'>
    {item?.profilePic?<img src={item?.profilePic}/>:<FaUserAlt style={{width:"2rem", height:"2rem",border:"2px silid black",borderRadius:"100%"}} />}
    <div className='info'>
        <h3 onClick={()=>navigate("/userprofile",{state:{userId:item._id}})} >{item?.username}</h3>
        <p>{item?.coursename} | {item?.stream}</p>
    </div>
    </div>
  )
}

export default Friend
