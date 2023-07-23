import React, { useEffect, useState } from 'react'
import Post from '../../component/Post'
import Bottomnav from '../navbar/Bottomnav'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const MyAllPosts = () => {

    const location = useLocation();
    const post = location.state.posts
    const {mode} = useSelector((state)=>state.auth)
    // console.log("posts is : ",post);
    // const [user,setUser] = useState([]);
    // useEffect(()=>{
    //   console.log("posts is : ",location.state);
    // },[])

  return (
    <div className='myallposts'  style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#282c34" , color:"white" }} >
    <h3>{post?.length > 0?`You have ${post?.length} Posts`:"You Haven't Done Post yet"}</h3>
      <div className='myposts'>
        <div className='posts' >
        {
           post?.map((post)=>(
                <Post post={post} />
            ))
        }
        </div>
      </div>
      <div className='navbar'>
        <Bottomnav/>
      </div>
    </div>
  )
}

export default MyAllPosts
