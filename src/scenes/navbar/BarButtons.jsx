import React from 'react'
import { useNavigate } from 'react-router-dom';

const BarButtons = ({id,setVisible}) => {
  const navigate = useNavigate();

  const deleteAcount = ()=>{

  }
  return (
    <div className='barbuttons' >
      <button onClick={()=>{localStorage.removeItem("token"); setVisible(false); navigate("/login") }} >Log Out</button>
      <button onClick={()=>{setVisible(false); navigate("/savedposts",{state:{userId:id}}) }} >Saved Post</button>
      <button onClick={deleteAcount} >Delete Account</button>
      <button onClick={()=>{setVisible(false); navigate("/blockedAccounts") }} >Blocked Accounts</button>
    </div>
  )
}

export default BarButtons
