import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Conversation from './Conversation'
import Message from './MsgComponents/Message'
import {RiLoginBoxFill, RiSendPlaneFill} from "react-icons/ri"
import { getConversations, getMessages, sendMessage, setMessages } from '../../state/Massanger'
import { useLocation } from 'react-router-dom'

import {io} from "socket.io-client"
import { BiBorderRadius,BiSend } from 'react-icons/bi'

const myStyle = {
  width:"2rem",
  height:"2rem",
  fontSize:"0.8rem",
  color:"white",
  backgroundColor:"#1877f2",
  border:"1px solid green",
  borderRadius:"100%"
}

const Messanger = () => {
  const ref = useRef(null)
    const mode = useSelector((state)=>state.auth.mode)
    const {Conversations,chatboxFriends,messages}= useSelector((state)=>state.messanger)
    const dispatch = useDispatch()
    const location = useLocation()
    const chatid = location?.state?.chatId || null ;
    const [myId,setMyId] = useState(null)
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // const socket = useRef(io("ws://localhost:8900"));
    const [chatId,setChatId] = useState(chatid)
    const [allMessages,setAllMessages] = useState([])
    const [myPic,setMyPic] = useState("")
    const [show,setShow] = useState(true)

    const [user,setUser] = useState(null)
    const [search,setSearch] = useState("")

    const scrollUp = ()=>{
      ref.current.scrollIntoView({behavior:"smooth",block:"start"})
    }

  useEffect(()=>{
  // socket.current = io("ws://localhost:8900")
  // chatId && socket.current.emit("addUser", chatId);
  const user = localStorage.getItem("user")
  const me = JSON.parse(user)
  dispatch(getConversations(me?._id))
  dispatch(getMessages(chatId))
  setMyId(me?._id)
  setMyPic(me?.profilePic)
  setAllMessages(messages)

  // socket.current.on("getMessage", (data) => {
  //   console.log("getMessage wala useEffect");
  //   setArrivalMessage({
  //     sender: data.senderId,
  //     text: data.text,
  //     createdAt: Date.now()
  //   });
  // });
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

  // socket.current.emit("sendMessage",{
  //   senderId: myId,
  //   receiverId:chatId,
  //   text: newMessage,
  // });

  const msg = {
    sender: myId,
    text: newMessage,
    conversationId: chatId,
  };
  dispatch(sendMessage(msg))
  // .then((response)=>{
  //   console.log("sendmsg : ",response);
  // })
} 

const filterConversation = (e) =>{
  setSearch(e.target.value)
}
  return (
    <div className='messenger' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      <div className={show?'chatMenu':"chatMenu1" }>
        <div className='menuWrap'>
            <input type='text' onChange={filterConversation} placeholder='Search for Chat...' /><br/><hr/>
            {
              chatboxFriends && chatboxFriends.map((c)=>(
                <Conversation key={c._id} setShow={setShow} setChatId={setChatId} setAllMessages={setAllMessages} search={search} conver={c.members} chatId={c._id} scrollUp={scrollUp} />
              ))
            }
        </div>
      </div>
      <div className={show?"chatBox":"chatBox1"}>
      <div className='boxWrap'>
        <div className='chatBoxTop'>
          {
            messages && messages.map((m)=>(
              <Message key={m._id} message={m} own={m.sender === myId} myPic={myPic} />
            ))
          }
        </div>
        <div ref={ref} className='chatBoxBottom'>
        <input
          className="chatMessageInput"
          placeholder="write something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
       <BiSend onClick={onClickSendMessage} className="chatSubmitButton" style={myStyle} />
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
