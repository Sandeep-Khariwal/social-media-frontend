import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

const API_PORT = "http://localhost:8080";
const override: CSSProperties = {
    // display: "block",
    width:"3rem",
    display:"flex",
    height:"3rem",
    border:"2px solid black",
    borderRadius:"100%",
    backgroundColor:"#1d2b3a",
    justifyContent:"center",
    alignItems:"center"
    // backgroundColor:"#282c34"
  };
const override1: CSSProperties = {
    // display: "block",
    width:"100%",
    display:"flex",
    height:"100%",
    border:"2px solid black",
    backgroundColor:"#1d2b3a",
    justifyContent:"center",
    alignItems:"center"
    // backgroundColor:"#282c34"
  };
const UserComment = ({comment}) => {

    const navigate = useNavigate()

    const {userId} = comment;
    const [username,setUserName] = useState("")
    const [userPic,setUserPic] = useState("")
    const [pending,setPending] = useState(true)
    let [color, setColor] = useState("#b766f5");
    const {Commentloading} = useSelector((state)=>state.user)
    useEffect(()=>{
       getCommentProfile()
    },[])
    const getCommentProfile = async()=>{
        try {
            const {success,username,profilePic} = await axios.get(`${API_PORT}/api/v1/posts/getCommentProfile/${userId}`).then((response)=>response.data)
            if(success){
                setUserName(username)
                setUserPic(profilePic)
                setTimeout(() => {
                    setPending(false);
                }, 1000);
            }
        } catch (error){
            console.log("error is : ",error);  
        }
    }
  return (
    <div className='postComments'>
      <div className='profile' >
        {userPic? 
        pending? <PulseLoader color={color} size={10} loading={pending} cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/>
        :<img src={userPic} alt='Photo' />
        :<FaUserAlt style={{width:"3rem", height:"3rem",border:"2px silid black",borderRadius:"100%"}} />}
      </div>
      <div className='content' >
      <h3 onClick={()=>navigate("/userprofile",{state:{userId:userId}})}>{username}</h3>
      <p>{comment.comment}</p>
      </div>
  </div>
  )
}

export default UserComment
