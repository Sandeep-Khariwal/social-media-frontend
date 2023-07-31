import React from 'react'
import { useDispatch } from 'react-redux';
import { DeletePost } from '../state/post';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const PostThreeDot = ({id ,userId, setVisible}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

 const deletePost = () =>{
    // e.preventDefault();
    dispatch(DeletePost({id,userId})).then((response)=>{
      const {success,message } = response.payload;
      if(success){
        toast.success(message);
      } else{
        toast.error(message);
      }
      })
  }
    return (
    <>
      <ToastContainer />
      <div className='barbuttons' onClick={()=>setVisible(false)} >
        <button onClick={deletePost} >Delete Post</button>
      </div>
      </>
    )
}

export default PostThreeDot
