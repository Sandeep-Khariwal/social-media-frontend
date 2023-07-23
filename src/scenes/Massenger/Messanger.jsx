import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Conversation from './Conversation'
import Message from './MsgComponents/Message'
import {RiLoginBoxFill, RiSendPlaneFill} from "react-icons/ri"
import { getConversations, getMessages, sendMessage, setMessages } from '../../state/Massanger'
import { useLocation } from 'react-router-dom'

import {io} from "socket.io-client"

const Messanger = () => {
    const mode = useSelector((state)=>state.auth.mode)
    const {Conversations,chatboxFriends,messages}= useSelector((state)=>state.messanger)
    const dispatch = useDispatch()
    const location = useLocation()
    const chatid = location?.state?.chatId || null ;
    const [myId,setMyId] = useState(null)
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io("ws://localhost:8900"));
    const [chatId,setChatId] = useState(chatid)
    const [allMessages,setAllMessages] = useState([])
    const [myPic,setMyPic] = useState("")

    const [user,setUser] = useState(null)

  useEffect(()=>{
  // socket.current = io("ws://localhost:8900")
  chatId && socket.current.emit("addUser", chatId);
  const user = localStorage.getItem("user")
  const me = JSON.parse(user)
  dispatch(getConversations(me._id))
  dispatch(getMessages(chatId))
  setMyId(me._id)
  setMyPic(me.profilePic)
  setAllMessages(messages)

  socket.current.on("getMessage", (data) => {
    console.log("getMessage wala useEffect");
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now()
    });
  });
  console.log("chat id changed");
},[])

    // useEffect(() => {
    //   socket.current.on("getMessage", (data) => {
    //     console.log("getMessage wala useEffect");
    //     setArrivalMessage({
    //       sender: data.senderId,
    //       text: data.text,
    //       createdAt: Date.now(),
    //     });
    //   });
    // },[chatId]);

   /* HIDDEN */
    // useEffect(() => {
    //   // console.log("mId is : ",myId,user._id);
    //   // socket.current.emit("addUser", myId);
    //   socket.current.on("getUsers", (users) => {
    //     console.log("getMessage wala useEffect",users);
    //     // setOnlineUsers(
    //     //   user.followings.filter((f) => users.some((u) => u.userId === f))
    //     // );
    //   });
    // }, []);

    useEffect(() => {
      arrivalMessage &&
      Conversations.includes(arrivalMessage.sender) &&
        dispatch(setMessages(arrivalMessage))
    }, [arrivalMessage,Conversation]);
  
const onClickSendMessage = (e) =>{
  e.preventDefault()
  setNewMessage("")

  socket.current.emit("sendMessage",{
    senderId: myId,
    receiverId:chatId,
    text: newMessage,
  });

  const msg = {
    sender: myId,
    text: newMessage,
    conversationId: chatId,
  };
  console.log("msg is : ",msg);
  dispatch(sendMessage(msg)).then((response)=>{
    console.log("sendmsg : ",response);
  })
} 
  return (
    <div className='messenger' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      <div className='chatMenu' >
        <div className='menuWrap'>
            <input type='text' placeholder='Search for Chat...' />
            {
              chatboxFriends && chatboxFriends.map((c)=>(
                <Conversation key={c._id} setChatId={setChatId} setAllMessages={setAllMessages} conver={c.members} myId={myId} chatId={c._id} />
              ))
            }
        </div>
      </div>
      <div className='chatBox'>
      <div className='boxWrap'>
        <div className='chatBoxTop'>
          {
            messages && messages.map((m)=>(
              <Message key={m._id} message={m} own={m.sender === myId} myPic={myPic} />
            ))
          }
        </div>
        <div className='chatBoxBottom'>
        <textarea
          className="chatMessageInput"
          placeholder="write something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
       <RiSendPlaneFill onClick={onClickSendMessage} className="chatSubmitButton" />
        </div>
      </div>
      </div>
      <div className='chatOnline'>
      <div className='onlineWrap' ></div>
      </div>
    </div>
  )
}

export default Messanger
