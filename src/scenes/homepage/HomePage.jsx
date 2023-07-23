import React, { useEffect, useRef, useState } from 'react'

import Navbar from "../navbar/Navbar"
import Bottomnav from '../navbar/Bottomnav'
import Profile from '../profile/Profile'
import Post from '../../component/Post'
import Friend from '../../component/Friend'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../state/post'
import PulseLoader from 'react-spinners/PulseLoader'
import { suggestions } from '../../state/Massanger'
// import {io} from "socket.io-client"
// import Layout from '../../Layout/Layout'

const override: CSSProperties = {
  // display: "block",
  width:"100%",
  display:"flex",
  height:"100vh",
  justifyContent:"center",
  paddingTop:"1rem"
  // alignItems:"center",
  // backgroundColor:"#1d2b3a",
  // backgroundColor:"#282c34"
};


const HomePage = () => {
  const mode = useSelector((state)=>state.auth.mode)
  const {suggestions} = useSelector((state)=>state.user);
  const {loading,allPosts} = useSelector((state)=>state.post)

  const [id,setId] = useState();
  const [user,setUser] = useState();
  const [suggest,setSuggest] = useState([]);
  const dispatch = useDispatch()
  const [friend,setFriends] = useState([])
  let [color, setColor] = useState("#b766f5");

  // const socket = useRef(io("ws://localhost:8900"));

  useEffect(()=>{
    // socket.current = io("ws://localhost:8900")
    const post = localStorage.getItem("user");
    const user = JSON.parse(post);
    getAllPosts()
    setUser(user)
  },[])


  const getAllPosts = ()=>{
      dispatch(getAllPost());
      // dispatch(suggestions(id)).then((response)=>{
      //   const {suggestion} = response.payload;
      //   localStorage.setItem("suggest",JSON.stringify(suggestion))
      //   setSuggest(suggestion)
      // });
  }
  return (
    // <Layout>
    <div className='home' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      <div className='navbar'>
        <Navbar id={user?._id} />
      </div>
      {loading?<PulseLoader color={color} size={20} loading={loading} cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/> :
      <div className='content'>
        <div className='profile' >
          <Profile/>
        </div>
        <div className='posts'>
          {
           allPosts && allPosts.map((post)=>(
              <Post key={post._id} post={post} />
            ))
          }
        </div>
        <div className='friends' >
          {/* <div className='friendList' style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#222" , color:"white" }}>
            <h4>Friend List</h4>
          {
            friend && friend.map((item)=>(
              <Friend key={item._id} item={item}/>
            ))
          }
           
          </div> */}
        <div className='suggestions' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } } >
          <h4>Sugestions</h4>
          {
            suggestions && suggestions.map((suggest)=>(
              <Friend key={suggest._id} item={suggest}/>
            ))
          }
        </div>
        </div>
      </div>}
      <div className='Bottomnav' >
      <Bottomnav/>
      </div>
    </div>
  )
}
export default HomePage
