import React, { useEffect } from 'react'
import Friend from '../Friend/Friend'
import Bottomnav from '../scenes/navbar/Bottomnav'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendList } from '../state/user'
import MyFriend from './MyFriend'
import { useLocation } from 'react-router-dom'

const style1 = {
    width:'100%',
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    overflow:"hidden"
}
const style2 = {
    width:'100%',
    minHeight:"100%",
    display:"flex",
    flexDirection:"column"
}
const style3 = {
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    bottom: "0"
}

const AllFriends = () => {
    const mode = useSelector((state)=>state.auth.mode)
    const location = useLocation()
    const {id} = location.state
    const { suggestions } = useSelector((state) => state.post);
    // console.log("suggestions myallfrnd : ",suggestions);
    const {myFriends} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
    const user = localStorage.getItem("user")
    const me = JSON.parse(user)
    if(id){
      dispatch(getFriendList(id))
    } else {
      dispatch(getFriendList(me._id))
    }
    },[])
  return (
    <div style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
    <div style={style1}>
      <div style={style2}>
        {
         myFriends.length > 0? myFriends.map((item,index)=>(
          <MyFriend key={index} item={item} />
         )) :<h1 style={{fontSize:"1.2rem",textAlign:"center"}} >Please Build your network</h1>
        }
      </div >
      <div style={{padding:"0.3rem"}} >
        <h4>Suggestions</h4>
        {suggestions &&
          suggestions.map((suggest,index) => (
          <Friend key={index} item={suggest}/>
        ))}
      </div>
      <div style={style3} ><Bottomnav/></div>
    </div>
    </div>
  )
}

export default AllFriends
