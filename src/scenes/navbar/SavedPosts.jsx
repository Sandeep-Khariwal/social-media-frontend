import React, { useEffect, useState } from 'react'
import Bottomnav from './Bottomnav'
import Post from '../../component/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getSavePosts } from '../../state/post'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SavedPosts = () => {
    const {mode} = useSelector((state)=>state.auth)
    const post = useSelector((state)=>state?.post?.savedPosts)
    const dispatch = useDispatch();
    const [id,setId] = useState()

    
    useEffect(()=>{
        const user = localStorage.getItem("user");
        const {_id} = JSON.parse(user);
        console.log("destructured id : ",_id);
        // setId(_id)
        dispatch(getSavePosts({_id})).then((response)=>{
            const {success,message } = response.payload;
            if(success){
              toast.success(message);
            } else{
              toast.error(message);
            }
            })
    },[])

  return (
    <div className='myallposts'  style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#282c34" , color:"white" }} >
    <ToastContainer/>
    <h3>{post?.length > 0?`You have ${post?.length} Saved Posts`:"You Haven't Save any Post yet"}</h3>
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

export default SavedPosts
