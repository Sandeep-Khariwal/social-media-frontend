import React, { useEffect, useRef, useState } from 'react'
import me from "../../assets/me.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileById } from '../../state/user'
import {io} from "socket.io-client"
import { getMessages } from '../../state/Massanger'
import { FaUserAlt } from 'react-icons/fa'

const Conversation = ({conver,myId,setChatId,setAllMessages,chatId,setShow,search,scrollUp}) =>{
  const {messages}= useSelector((state)=>state.messanger)

  const dispatch = useDispatch()
  // const {userProfile} = useSelector((state)=>state.user)
  const [user,setUser] = useState()
  useEffect(()=>{
    const socket = io();
    const user = localStorage.getItem("user")
    const me = JSON.parse(user)
    const friendId = conver.filter((id)=> id !== me?._id);
    dispatch(getUserProfileById({id:friendId,myid:me?._id})).then((response)=>{
      const {user}=response.payload;
      setUser(user)
    })
    setChatId(chatId)
  },[])


const openChat = (e) =>{
  e.preventDefault()
  scrollUp()
  setShow((prev)=>!prev)
  
  dispatch(getMessages(chatId))
  // socket.current.emit("addUser", chatId)
  // socket.current.on("getMessage", (data) => {
  //   console.log("get data: ",data);
  // });
}

  return ( <>
   {search !== ""?
    user?.username.includes(search)?<div className='conversation' onClick={openChat} >
    { user?.profilePic? <img src={user?.profilePic} alt='not found'/>:<FaUserAlt
        style={{
          width: "2rem",
          height: "2rem",
          border: "2px silid black",
          borderRadius: "100%",
        }}
      />}
     <span>{user?.username}</span>
   </div> : ""
    :<div className='conversation' onClick={openChat} >
     { user?.profilePic? <img src={user?.profilePic} alt='not found'/>:<FaUserAlt
        style={{
          width: "2rem",
          height: "2rem",
          border: "2px silid black",
          borderRadius: "100%",
        }}
      />}
    <span>{user?.username}</span>
  </div>
  }
  </>)
}

export default Conversation
