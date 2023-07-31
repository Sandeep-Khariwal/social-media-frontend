import React, { useEffect, useState } from 'react'
import {FaUserAlt} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Bottomnav from '../scenes/navbar/Bottomnav';
import { InputElem } from '../component/InputElem';
import { createPost } from '../state/post';


const CreatePosts = () => {

  const mode = useSelector((state)=>state.auth.mode)
  const dispatch = useDispatch()

  const [photo,setPhoto] = useState("");
  const [text,setText] = useState("");
  const [user,setUser] = useState();
  const [height,setHeight] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  },[])

  const postData = (e) =>{
   e.preventDefault();
   const formData = new FormData();
   formData.append("photo",photo);
   formData.append("description",text);
   dispatch(createPost({formData,id:user?._id})).then((response)=>{
    const {success,message,newUser} = response.payload;
    if(success){
      toast.success(message);
      localStorage.setItem("user",JSON.stringify(newUser));
      setTimeout(()=>{
        navigate("/")
      },[2000])
     }
   });
  }

  return (<><ToastContainer/>
    <div className='createPost' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      
      <div className='input'>
        <label>
        {photo? <img src={window.URL.createObjectURL(photo)} alt='Not Found'/> : "Add photo" }
        <input type='file'  name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
        </label>
      </div>
      <div className='desc'>
        <InputElem setText={setText} setHeight={setHeight} />
      </div>
      {/* <div className='preview'>
       { photo? <img src={window.URL.createObjectURL(photo)} alt='Not Found'/> : "" }
      </div> */}

    <div className='btns'>
    <button onClick={postData} >Post</button>
    <button onClick={()=> {setPhoto(""); setText("")} } >Clear</button>
    </div>
    <div className='Bottomnav' >
      <Bottomnav/>
      </div>
    </div>
    </>)
}

export default CreatePosts
