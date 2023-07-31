import React, { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getMyProfileById } from '../state/user'

const Like = ({id}) => {
    const navigate = useNavigate()
    const [item,setItem] = useState()
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getMyProfileById(id)).then((response)=>{
        const {user,success} = response.payload;
        if(success){
            setItem(user)
        }
      })
    },[])
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

export default Like
