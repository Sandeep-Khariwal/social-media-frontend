import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
// import { leaveCommentApi } from "../state/user";
import { useDispatch, useSelector } from "react-redux";
import UserComment from "./UserComment";
import { json } from "react-router-dom";
import { leaveCommentApi } from "../state/post";

const Comment = ({ id, userId , comments , likes , setComments }) => {
  const dispatch = useDispatch();
  // const { comments } = useSelector((state) => state.user);
  const [commenting, setComment] = useState("");
  const [commentList,setCommentList] = useState(comments)

  const leaveComment = (e) => {
    e.preventDefault();
    const newComment = new Object()
    newComment.userId = userId
    newComment.comment = commenting
    setCommentList((prev)=> [...prev,newComment]);
    const formData = new FormData();
    formData.append("comment", commenting);
    dispatch(leaveCommentApi({ id, userId, formData })).then((response) => {
      const { success, message } = response.payload;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div className="comments">
      <Toaster />
      <form>
        <input
          type="text"
          placeholder="Leave your Comment...."
          onChange={(e) => setComment(e.target.value)}
          name="comment"
        />
        <button onClick={leaveComment}>Leave</button>
      </form>
      <div className="allCmnts">
        <h3>All Comments</h3>
        {commentList && commentList.map((comment, index) => (
          <UserComment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
