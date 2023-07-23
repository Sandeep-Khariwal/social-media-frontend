import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {leaveCommentApi } from '../state/user';
import { useDispatch, useSelector } from 'react-redux';
import UserComment from '../Comment/UserComment';

const API_PORT = "http://localhost:8080";
const Comment = ({id,userId}) => {
 
  // const {comment} = Comments;
  const dispatch = useDispatch()
  const {comments} = useSelector((state)=>state.user)
  // const [comments,setComments]

  // useEffect
  const [commenting,setComment] = useState("");

  const leaveComment = (e)=>{
   e.preventDefault();
    const formData = new FormData();
    // formData.append("userId",userId)
    formData.append("comment",commenting)
    dispatch(leaveCommentApi({id,userId,formData})).then((response)=>{
      const {success,message } = response.payload;
      if(success){
        toast.success(message);
      } else{
        toast.error(message);
      }
      })

  }

  return (
    <div className='comments'>
      {/* <ToastContainer comments={comments}/> */}
      <ToastContainer/>
    <form>
      <input type='text' placeholder='Leave your Comment....' onChange={(e)=>setComment(e.target.value)} name='comment' />
      <button onClick={leaveComment} >Leave</button>
    </form>
    <div className='allCmnts'>
       <h3>All Comments</h3>
       {
        comments.map((comment)=>(
         <UserComment key={comment._id} comment={comment}/>
        ))
       }
    </div>
  </div>
  )
}

export default Comment
