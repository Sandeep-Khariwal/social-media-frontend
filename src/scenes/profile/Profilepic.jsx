import React from 'react'
import me from "../../assets/me.jpg"

const myStyle = {
    width:"98%",
    height:"50vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    cursor:"pointer"
}

const imgStyle = {
    width:"15rem",
    height:"15rem",
    border:"2px solid black",
    borderRadius:"100%"
}

const Profilepic = ({profile,visible}) => {
  return (
    <div style={myStyle} >
      <img src={profile} alt='not' style={imgStyle} />
    </div>
  )
}

export default Profilepic
