import React, { useEffect, useState } from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {BiSearch} from "react-icons/bi"
import {CgProfile,CgAdd} from "react-icons/cg"
import { MdOutlineNotifications} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { Badge } from 'antd';

const Bottomnav = () => {

  const [user,setUser] = useState({})

  useEffect(()=>{
    const user = localStorage.getItem("user")
    setUser(JSON.parse(user));
  },[])
  const navigate = useNavigate()

  return (
    <div className='bottomNav'>
      <AiOutlineHome className='icons' title='Home' onClick={()=>{navigate("/home")}} />
      <BiSearch className='icons' title='Search' onClick={()=>{navigate("/search")}} />
      <CgAdd className='icons' title='Post' onClick={()=>{navigate(`/post/${user._id}`)}} />
      {/* <Badge className='icons' count={5} >
        <MdOutlineNotifications title='notifications' onClick={()=>{navigate("/notifications")}}/>
      </Badge> */}
      <CgProfile className='icons' title='My Profile' onClick={()=>{navigate("/profile")}} />
    </div>
  )
}

export default Bottomnav
