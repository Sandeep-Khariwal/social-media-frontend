import React, { useState } from 'react'
import me from "../../assets/myRandomPic.jpg"
import {motion} from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { FaInstagram , FaFacebookSquare , FaLinkedin } from "react-icons/fa"

import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setLogin } from '../../state'

const initalData = {email:"",password:""}

const Login = () => {

  const dispatch = useDispatch();
  const { status , user }= useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const [data,setData] = useState(initalData);

  const onChangeHandle = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const onClickHandle = async(e) =>{
    e.preventDefault();

    dispatch(loginUser(data)).then((response)=>{
      const {success} = response.payload;
      if(success){
        // toast.success(message);
        setTimeout(()=>{
          navigate("/home")
        },[2000])
      } else{
        // toast.error(message);
      }
      })
  }

  return (<>
  <Toaster />
    <div className='login' >
      <div className='loginInfo' >
        <h2>Find your career mate with Batch-mate App</h2>
       <div>
       <h2>Designed and created By,</h2>
       <p 
       initial={{x:"-100%",opacity:0 }}
       whileInView={{x:"0%",opacity:1 }}
       transition={{delay:0.5,duration:0.5}}
       >Sandeep Khariwal</p>
       <img src={me} alt='not found'
       initial={{x:"+100%",opacity:0 }}
       whileInView={{x:"0%",opacity:1 }}
       transition={{delay:0.5,duration:0.5}} />
       <div className='icons' >
        <Link to={"https://www.instagram.com/sandeep_khariwal/"} ><FaInstagram/></Link>
        <Link to={"https://www.facebook.com/sandeep.kharival.3"} ><FaFacebookSquare/></Link>
        <Link to={"https://www.linkedin.com/in/sandeep-khariwal-95b65522b"} ><FaLinkedin/></Link>
       </div>
       </div>
      </div>
      <div className='loginForm' >
       <div>
        <motion.form>
        <div className='inputbox' >
        <input type='email' name='email' onChange={onChangeHandle} initial={{y:"+100%",opacity:0 }}whileInView={{y:"0%",opacity:1 }}transition={{delay:0.1,duration:0.5}} />
           <span>Email</span>
        </div>
        <div className='inputbox' >
        <input type='password'  name='password' onChange={onChangeHandle}   minLength={6}  initial={{y:"+100%",opacity:0 }}whileInView={{y:"0%",opacity:1 }}transition={{delay:0.1,duration:0.5}}/>
           <span>Password</span>
        </div>
          <button onClick={onClickHandle} initial={{x:"+100%",opacity:0 }}whileInView={{x:"0%",opacity:1 }}transition={{delay:0.1,duration:0.4}}>Login</button>
          <button initial={{x:"+100%",opacity:0 }}whileInView={{x:"0%",opacity:1 }}transition={{delay:0.1,duration:0.2}} onClick={()=>{navigate("/register")}} >Sign Up</button>
          {/* <a href='/' initial={{y:"+100%",opacity:0 }}whileInView={{y:"0%",opacity:1 }}transition={{delay:0.1,duration:0.2}}>forgot password?</a> */}
        </motion.form>
       </div>
      </div>
    </div>
  </>
  )
}

export default Login
