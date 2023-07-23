import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Register } from '../../API/service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../state';

const initialize = {
  username:"",
  email:"",
  password:"",
  collegename:"",
  coursename:"",
  stream:"",
  address:""
};

const Registration = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState(initialize)
    const dispatch  = useDispatch()
    const { loading }= useSelector((state)=>state.auth)

    const handleChange = (e) =>{
      setUser({...user,[e.target.name]:e.target.value})
    }

    const Registration = (e) =>{
      e.preventDefault()
      if(!user.username){
        toast.error("Username is must")
         return;
      }
    if(!user.email){
        toast.error("email is must")
        return;
      }
      if(!user.password){
        toast.error("password is must")
        return;
      }
      if(user.password.length < 6){
        toast.error("Password must be 6 digits")
         return;
      }
      if(!user.collegename){
        toast.error("collegename is must")
        return;
      }
      if(!user.coursename){
        toast.error("coursename is must")
        return;
      }
      if(!user.stream){
        toast.error("coursename is must")
        return;
      }
      if(!user.address){
        toast.error("address is must")
        return;
      }
      
      dispatch(registerUser(user)).then((response)=>{
        const {success,message } = response.payload;
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

  return (
    <div className='register'>
      <ToastContainer />
        <h1>Registration</h1>
      <form>
      {/* <div className='inputbox' >
        <input onChange={ handleChange } type='text' />
        <span>User Name</span>
      </div> */}
      <div className='inputbox' >
      <input onChange={ handleChange } type='text' name='username' required />
        <span>User Name</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } name='email' type='email'  required />
        <span>Email</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } minLength={7} type='password' name='password' required />
        <span>Password</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } type='text' name='collegename' required />
        <span>College Name</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } type='text' required name='coursename' />
        <span>Course Name</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } type='text' name='stream' required />
        <span>Stream Name</span>
      </div>
      <div className='inputbox' >
      <input onChange={ handleChange } type='text' name='address'  required /><br/>
        <span>Address</span>
      </div>
    
        <button onClick={Registration} >Register</button> 
      </form>
    </div>
  )
}

export default Registration
