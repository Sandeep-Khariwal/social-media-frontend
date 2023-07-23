import React, { useEffect, useRef } from 'react'
import me from "../../assets/me.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileById } from '../../state/user'
import {io} from "socket.io-client"
import { getMessages } from '../../state/Massanger'

const Conversation = ({conver,myId,setChatId,setAllMessages,chatId}) =>{
  const {messages}= useSelector((state)=>state.messanger)
  console.log("all is : ",chatId);

  const dispatch = useDispatch()
  const {userProfile} = useSelector((state)=>state.user)
  useEffect(()=>{
    const friendId = conver.filter((id)=> id !== myId);
    dispatch(getUserProfileById({id:friendId,myid:myId}))
    setChatId(chatId)
  },[])

const openChat = (e) =>{
  e.preventDefault()
  
  dispatch(getMessages(chatId)).then((response)=>{
    // console.log("response is: ",response.payload);
  })
  // socket.current.emit("addUser", chatId)
  // socket.current.on("getMessage", (data) => {
  //   console.log("get data: ",data);
  // });
}

  return (
    <div className='conversation' onClick={openChat} >
      <img src={userProfile?.profilePic} alt='not found'/>
      <span>{userProfile?.username}</span>
    </div>
  )
}

export default Conversation
