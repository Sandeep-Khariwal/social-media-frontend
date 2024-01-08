import React, { useEffect, useState } from 'react'
import {FaBookReader} from "react-icons/fa"
import {IoDocumentText} from "react-icons/io5"

import {HiOutlineBuildingLibrary} from "react-icons/hi2"
import { RiEditBoxLine } from "react-icons/ri"
import {Modal} from "antd"
import {FaUserAlt,FaUserCircle} from "react-icons/fa"

import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import Profilepic from './Profilepic'
import Bgprofilepic from './Bgprofilepic'

const Profile = () => {
  const  { mode}  = useSelector((state)=> state.auth);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [user,setUser] = useState({})

 
  useEffect(()=>{
    const myDetails = localStorage.getItem("user");
    setUser(JSON.parse(myDetails));
  },[])

  return (
    <section style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } } >
      <Modal onCancel={()=>setVisible1(false)} footer={null} open={visible1}>
           <Profilepic profile={user?.profilePic} visible={visible1} />
      </Modal>
      <Modal onCancel={()=>setVisible2(false)} footer={null} open={visible2}>
           <Bgprofilepic profile={user?.BgPic} visible={visible2} />
      </Modal>
      <div className='bgpic' onClick={()=>setVisible2(true)} >
       { user?.BgPic?  <img src={user?.BgPic} alt='not found'/> : <FaUserCircle style={{width:"50%", height:"100%"}} />  }
      </div>
      <div className='profilepic' onClick={()=>setVisible1(true)}>
      { user?.profilePic?  <img src={user?.profilePic} alt='not found'/> :  <FaUserAlt style={{width:"50%", height:"100%"}} />  }
      </div>
      <div className='details'>
        <h2>{user && user.username}</h2>
      <div>
      <div className='about'><div className='info' ><HiOutlineBuildingLibrary className='icon' /></div> <div><p>{user && user.collegename}</p></div></div>
      <div className='about'><div className='info' ><IoDocumentText className='icon' /></div> <div><p>{user && user.coursename}</p></div></div>
      <div className='about'><div className='info' ><FaBookReader className='icon' /></div> <div><p>{user && user.stream}</p></div></div>
      <div className='about'><div className='info' ><HiOutlineBuildingLibrary className='icon' /></div> <div><p>{user && user.address}</p></div></div>
      </div>
      <Link to={`/editprofile/${user?._id}`}>Edit Profile <RiEditBoxLine style={{fontSize:"1.3rem" }}/> </Link>
      </div>
    </section>
  )
}

export default Profile
