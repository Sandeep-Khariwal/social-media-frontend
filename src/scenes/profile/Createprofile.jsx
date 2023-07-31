import React, { useEffect, useRef, useState } from 'react'
import {FaUserAlt,FaUserCircle} from "react-icons/fa"
import {RiEditBoxLine } from "react-icons/ri"
import { updateProfile } from '../../API/service';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../state';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profilepic from './Profilepic';


// const initialize = {
//     username:"",
//     collegename:"",
//     coursename:"",
//     stream:"",
//     address:"",
//     friends:[],
//     posts:[]
// };



const Createprofile = () => {

  const navigate = useNavigate()

  const [user,setUser] = useState()
  const [name,setUsername] = useState("")
  const [bio , setBio] = useState("")
  const [look , setLook] = useState("")
  const [clgname,setCollegename] = useState("")
  const [crsname,setCoursename] = useState("")
  const [strm,setStream] = useState("")
  const [batch,setBatch] = useState("")
  const [adrs,setAddres] = useState("")
  const [skills,setSkills] = useState("")
  const [BgPic , setBgphoto] = useState("")
  const [profilePic , setPhoto] = useState("")
  var [page,setPage] = useState(0);
  // const me = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch()

  var {id} = useParams()
  var Picurl = "";

  useEffect(()=>{
    const myDetails = localStorage.getItem("user");
    const user = JSON.parse(myDetails);
    const { _id , username , bio , look , collegename , coursename , stream , batch , address , skills , profilePic , BgPic } = user;
    setUsername(username);
    setCollegename(collegename);
    setCoursename(coursename);
    setStream(stream);
    setAddres(address)
    setBio(bio);
    setLook(look);
    setBatch(batch)
    setSkills(skills)
    setPage(0)
  },[])

   
  const onFormSubmit = (e) =>{
    e.preventDefault();

  const formData = new FormData();
  formData.append("username",name)
  formData.append("bio",bio)
  formData.append("look",look)
  formData.append("collegename",clgname)
  formData.append("coursename",crsname)
  formData.append("stream",strm)
  formData.append("batch",batch)
  formData.append("address",adrs)
  formData.append("skills",skills)
  formData.append("profilePic",profilePic) 
  formData.append("BgPic",BgPic)

    dispatch(editProfile({id,formData})).then((response)=>{
      const {success,message} = response?.payload;
          if(success){
            toast.success(message);
            setTimeout(()=>{
              navigate("/home")
            },[3000])
          } else{
            toast.error(message);
          }
    })
    }

    const changePhoto = (e) =>{
      Picurl = window.URL.createObjectURL(e.target.files[0])
      setPhoto(e.target.files[0])
    }
    const changeBgPhoto = (e) =>{
      var Bgurl = window.URL.createObjectURL(e.target.files[0])
      setBgphoto(e.target.files[0])
    }
  return (
    <div className='createprofile'>
         <ToastContainer />
      <form onSubmit={onFormSubmit}>
        <label>
        {BgPic?<img src={ BgPic &&window.URL.createObjectURL(BgPic)} alt='photo' style={{width:"100%", height:"100%" , borderRadius:"0.5rem"}} />:<FaUserCircle style={{width:"50%", height:"100%" }}/>}
        <input type='file' accept='image/*' name='BgPic' onChange={changeBgPhoto} hidden/>
        </label>
        <label>
        { profilePic? <img src={profilePic && window.URL.createObjectURL(profilePic) } alt='photo' style={{width:"100%", height:"100%" , borderRadius:"100%"}} />:<FaUserAlt style={{width:"50%", height:"100%"}}/>}
        <input type='file' accept='image/*' name='profilePic' onChange={changePhoto} hidden/>
        </label>
        <div className='allinputs' >

        <div className='bio'>
         <h3>About</h3>
        <div className='inputbox' >
           <input type='text'  name='username' value={name}  onChange={(e)=>setUsername(e.target.value)}/>
           <span>User Name</span>
        </div>
        <div className='inputbox' >
           <input type='text' name='bio' value={bio} placeholder='Ex: Doing Web Development' onChange={(e)=>setBio(e.target.value)} />
           <span> Describe Bio</span>
        </div>
        <div className='inputbox' >
        <input  type='text' name='look' placeholder='Ex: internship/Job' value={look} onChange={(e)=>setLook(e.target.value)} />
           <span>Looking For</span>
        </div>
        </div>

        <div className='education' style={page >= 1?{display:"block"}:{display:"none"}}>
        <h3>Education</h3>
        <div className='inputbox' >
          <input type='text' value={clgname}  onChange={(e)=>setCollegename(e.target.value)} />
          <span>College Name</span>
        </div>
        <div className='inputbox'>
        <input type='text' value={crsname} name='coursename'  onChange={(e)=>setCoursename(e.target.value)}/>
           <span>Course Name</span>
        </div>
        <div className='inputbox' >
        <input type='text' value={strm} name='stream'  onChange={(e)=>setStream(e.target.value)}/> 
           <span>Stream Name</span>
        </div>
        <div className='inputbox' >
        <input type='text' name='batch' value={batch} placeholder='Ex : 2021-2024' onChange={(e)=>setBatch(e.target.value)} />
           <span>Batch</span>
        </div>
        <div className='inputbox' >
        <input type='text' value={adrs} name='address'  onChange={(e)=>setAddres(e.target.value)} />
           <span>Address</span>
        </div>
        </div>
        <div className='skills' style={page >= 2?{display:"block"}:{display:"none"}} >
        <h3>My Skills</h3>
        <div className='inputbox' >
        <input type='text'  name='address' value={skills} placeholder='Ex: Java,MS-office,communication'  onChange={(e)=>setSkills(e.target.value)} />
           <span>Skills</span>
        </div>
        </div>
        <div className='btns'>
        <button type='button' onClick={()=>{ console.log(page); setPage(page=page+1)}} style={page < 2?{display:"block"}:{display:"none"}} >Save & Continue </button>
        <button type='submit'>Edit <RiEditBoxLine style={{fontSize:"1.3rem" }}/> </button>
       </div>
       </div>
      </form>
    </div>
  )
}

export default Createprofile
