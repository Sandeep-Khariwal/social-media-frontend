import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {FaUserAlt} from "react-icons/fa"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Bottomnav from '../navbar/Bottomnav';
import { InputElem } from '../../component/InputElem';

const API_PORT = "http://localhost:8080";

const CreatePosts = () => {

  const mode = useSelector((state)=>state.auth.mode)

  const [photo,setPhoto] = useState("");
  const [text,setText] = useState(``);
  const [user,setUser] = useState();
  const [height,setHeight] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  },[])

  const postData = async(e) =>{
   e.preventDefault();

   const formData = new FormData();
   formData.append("photo",photo);
   formData.append("description",text);

   console.log(user._id);
   const {success ,message , post , newUser} = await axios.post(`${API_PORT}/api/v1/posts/post/${user._id}`,formData)
   .then((response)=>response.data);

   if(success){
    toast.success(message);
    localStorage.setItem("user",JSON.stringify(newUser));
    localStorage.setItem("posts",JSON.stringify(post));
    setTimeout(()=>{
      navigate("/")
    },[3000])
   }

  }

  // const textAreaAdjust=(e)=> {
  //   e.style.height = "1px";
  //   e.style.height = (25+e.scrollHeight)+"px";
  // }

  return (<><ToastContainer/>
    <div className='createPost' style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
      
      <div className='input'>
        <label>
        {photo? photo.name : "Upload photo" }
        <input type='file'  name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
        </label>
      </div>
      <div className='desc'>
        <InputElem setHeight={setHeight} />
      </div>
      <div className='preview'>
       { photo? <img src={window.URL.createObjectURL(photo)} alt='Not Found'/> : <FaUserAlt style={{width:"50%", height:"100%"}} />  }
      </div>

    <div className='btns'>
    <button onClick={postData} >Post</button>
    <button onClick={()=> {setPhoto(""); setText("")} } >Clear</button>
    </div>
    <div className='Bottomnav' >
      <Bottomnav/>
      </div>
    </div>
    {/* <div className='Bottomnav' >
      <Bottomnav/>
      </div> */}
    </>)
}

export default CreatePosts
