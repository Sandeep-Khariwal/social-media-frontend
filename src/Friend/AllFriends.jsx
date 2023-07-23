import React from 'react'
import Friend from '../component/Friend'
import Bottomnav from '../scenes/navbar/Bottomnav'
import { useSelector } from 'react-redux'

const style1 = {
    width:'100%',
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItms:"center"
}
const style2 = {
    width:'70%',
    minHeight:"100%",
    display:"flex",
    flexDirection:"column",
    // justifyContent:"center",
    // alignItms:"center"
}
const style3 = {
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    bottom: "0"
    // justifyContent:"center",
    // alignItms:"center"
}

const AllFriends = () => {
    const mode = useSelector((state)=>state.auth.mode)
  return (
    <div style={mode === 'light'? {backgroundColor:"#FAF9F6",color:"black"}:{backgroundColor:"#282c34" , color:"#FAF9F6" } }  >
    <div style={style1}>
      <div style={style2} ><Friend/></div>
      <div style={style3} ><Bottomnav/></div>
    </div>
    </div>
  )
}

export default AllFriends
