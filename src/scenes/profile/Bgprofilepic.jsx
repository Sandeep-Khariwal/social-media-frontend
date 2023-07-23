import React from 'react'
import bgimg from "../../assets/me2.jpg"

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

const Bgprofilepic = ({profile}) => {
  return (
    <div style={myStyle} >
      <img src={profile} alt='not' style={imgStyle} />
    </div>
  )
}

export default Bgprofilepic
