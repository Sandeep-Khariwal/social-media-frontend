import React, { useEffect, useState } from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {BiSearch} from "react-icons/bi"
import {CgProfile,CgAdd} from "react-icons/cg"
import { MdOutlineNotifications} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { Badge } from 'antd';
import Profile from './Profile'
import me from "../../assets/me2.jpg"
import Bottomnav from "../navbar/Bottomnav"
import Friend from '../../Friend/Friend'
import {FaUserAlt,FaUserCircle} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import Profilepic from './Profilepic'
import Bgprofilepic from './Bgprofilepic'
import {Modal} from "antd"
import { getMyProfileById, getUserProfileById } from '../../state/user'

const MyProfile = () => {
  const {mode} = useSelector((state)=>state.auth);
  const dispatch = useDispatch()
    const navigate = useNavigate();

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const [user,setUser] = useState([]);
    const {  BgPic , profilePic} = user;
    const {userProfile,loading,suggestions,friends} = useSelector((state)=>state.user);
    useEffect(()=>{
      const user = localStorage.getItem("user");
      const suggestion = localStorage.getItem("suggestion")
      const getsug = JSON.parse(suggestion);
      const {_id} = JSON.parse(user);
      dispatch(getMyProfileById(_id))

      setUser(JSON.parse(user));
      const { posts } = JSON.parse(user)
    },[])

  return ( 
    <div className='myprofile' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >

      <Modal onCancel={()=>setVisible1(false)} footer={null} open={visible1}>
           <Profilepic profile={profilePic} visible={visible1} />
      </Modal>
      <Modal onCancel={()=>setVisible2(false)} footer={null} open={visible2}>
           <Bgprofilepic profile={BgPic} visible={visible2} />
      </Modal>

      <div className='content' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      <div className='about'>
        <div className='info' >
          <div className='bgimg' onClick={()=>setVisible2(true)} >
           {BgPic?<img src={BgPic} alt='Not Found'/>:<FaUserCircle style={{width:"50%", height:"100%"}} /> }
          </div>
          <div className='data-container' >
      <div className='data' >
        <div onClick={()=>setVisible1(true)} >
         {profilePic? <img src={profilePic} alt='Not Found'/> : <FaUserAlt style={{width:"50%", height:"100%",border:"2px silid black",borderRadius:"100%"}} /> }
        </div>
        <div>
          <p>{userProfile?.username}</p>
        </div>
        </div>
        <div className='profile-data' >
           <div className='post-frnd'>
              <div className="postnum">
                <h3>{userProfile?.posts?.length}</h3>
                <p>Posts</p>
              </div>
              <div className="frnds">
                <h3>{userProfile?.friends?.length}</h3>
                <p>Friends</p>
              </div>
           </div>
           <div className='btns' >
           <button onClick={()=>navigate("/myallposts",{state:{posts:userProfile?.posts}})} >Posts</button>
           <button onClick={()=>navigate(`/editprofile/${user._id}`)} >Edit</button>
           </div>
        </div>
      </div>

      <div className='bio' >
        <div className='desc'>
          <div className='desctxt'><h3>Bio : </h3></div>
          <div className='descval'><p>{userProfile?.bio?userProfile.bio:"Bio Not Saved"}</p></div>
        </div>
        <div className='looking4'>
          <div className='looktxt'><h3>Looking for : </h3></div>
          <div className='lookval'><p>{userProfile?.look?userProfile.look:"Not Saved"}</p></div>         
        </div>
       </div>
      </div>
       <div className='skills' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
        <p>My Skills</p>
        <div>
          {
            userProfile?.skills && userProfile?.skills.map((item,index)=>(
              <li key={index} >{item}</li>
            ))
          }
        </div>
       </div>
      </div>
      <div className='edu-suggest'  >
      <div className='education'>
       <div className='edu' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
       <h3>Education</h3>
        <div className='edu-info' >
          <div className='batch'>
            <h3>Batch : <span>{userProfile?.batch?userProfile.batch:"Not Saved"}</span></h3>
            <h3>Year : <span>{userProfile?.year?userProfile.year:"Not Saved"}</span></h3>
          </div>
          <div className='clgname' >
            <h3>College: </h3>
            <p>{userProfile?.collegename?userProfile.collegename:"Not Saved"}</p>
          </div>
          <div className='crsname' >
            <h3>Course: </h3>
            <p>{userProfile?.coursename?userProfile.coursename:"Not Saved"}</p>
          </div>
          <div className='stream' >
            <h3>Stream: </h3>
            <p>{userProfile?.stream?userProfile.stream:"Not Saved"}</p>
          </div>
          <div className='address' >
            <h3>Address: </h3>
            <p>{userProfile?.address?userProfile.address:"Not Saved"}</p>
          </div>
        </div>
       </div>
       <div className='suggest' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
        <h3>Suggestions</h3>
        {
          suggestions && suggestions.map((item=>(
            <Friend key={item._id} item={item} />
          )))
        }
       </div>
      </div>
   </div>
      </div>
      <div className='nav' >
      <Bottomnav/>
      </div>
    </div>
  )
}

export default MyProfile
