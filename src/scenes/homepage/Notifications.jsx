import React from 'react'
import Notification from '../../component/Notification'
import Bottomnav from '../navbar/Bottomnav'
import { useSelector } from 'react-redux'

const myStyle1 = {
    width:"100%",
    height:"100vh",

    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
}

const myStyle2 = {
    width:"90%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"start"
}

const myStyle3 = {
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    bottom: "0"
}

const Notifications = () => {
  const {mode} = useSelector((state)=>state.auth);
  return (
    <div  style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#282c34" , color:"white" }} >
     <div style={myStyle1}>
     <div style={myStyle2} >
        <Notification/>
        <Notification/>
        <Notification/>
        <Notification/>
        <Notification/>
        <Notification/>
        <Notification/>
      </div>
      <div style={myStyle3} >
      <Bottomnav/>
      </div>
     </div>
    </div>
  )
}

export default Notifications
