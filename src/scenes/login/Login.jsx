import React, { useState } from 'react'
import me from "../../assets/me.jpg"
import {motion} from "framer-motion"
import Appstore from "../../assets/Appstore.png"
import playstore from "../../assets/playstore.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaInstagram , FaFacebookSquare , FaLinkedin } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setLogin } from '../../state'

const initalData = {email:"",password:""}

const Login = () => {

  const dispatch = useDispatch();
  const { status , user , message }= useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const [data,setData] = useState(initalData);

  const onChangeHandle = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const onClickHandle = async(e) =>{
    e.preventDefault();

    dispatch(loginUser(data)).then((response)=>{
      const {success,message } = response.payload;
      if(success){
        toast.success(message);
        setTimeout(()=>{
          // window.location.reload(true)
          navigate("/home")
        },[2000])
      } else{
        toast.error(message);
      }
      })
  }

  return (<>
  <ToastContainer />
    <div className='login' >
      <div className='loginInfo' >
        <h2>Welcome to the Batch-Mate App</h2>
       <div>
       {/* <h1>Welcome To The APP</h1> */}
       <h2>Designed and created By,</h2>
       <motion.p 
       initial={{x:"-100%",opacity:0 }}
       whileInView={{x:"0%",opacity:1 }}
       transition={{delay:0.5,duration:0.5}}
       >Sandeep Khariwal</motion.p>
       <motion.img src={me} alt='not found'
       initial={{x:"+100%",opacity:0 }}
       whileInView={{x:"0%",opacity:1 }}
       transition={{delay:0.5,duration:0.5}} />
       <div className='icons' >
        <Link to={"/"} ><FaInstagram/></Link>
        <Link to={"/"} ><FaFacebookSquare/></Link>
        <Link to={"/"} ><FaLinkedin/></Link>
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
          <motion.button onClick={onClickHandle} initial={{x:"+100%",opacity:0 }}whileInView={{x:"0%",opacity:1 }}transition={{delay:0.1,duration:0.4}}>Login</motion.button>
          {/* <p>or</p> */}
          <motion.button initial={{x:"+100%",opacity:0 }}whileInView={{x:"0%",opacity:1 }}transition={{delay:0.1,duration:0.2}} onClick={()=>{navigate("/register")}} >Sign Up</motion.button>
          <a href='/' initial={{y:"+100%",opacity:0 }}whileInView={{y:"0%",opacity:1 }}transition={{delay:0.1,duration:0.2}}>forgot password?</a>
        </motion.form>
       </div>
      </div>
    </div>
    {/* <div className='playstore' >
    <img src={Appstore} alt='not'/>
    <img src={playstore} alt='not' />
  </div> */}
  </>
  )
}

export default Login
