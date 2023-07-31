import React, { useState } from 'react'
import { MdLightMode , MdModeNight , MdOutlineNotifications} from "react-icons/md"
import {BiMessageRoundedDots} from "react-icons/bi"
import {FaBars,FaUserFriends} from "react-icons/fa"
import { useSelector , useDispatch } from "react-redux"
import { setMode } from '../../state'
import { Badge, Modal } from 'antd';
import logo from "../../assets/logo.png"
import BarButtons from './BarButtons'
import { useNavigate } from 'react-router-dom'


const Navbar = ({id,suggestions}) => {
    const {mode ,token } = useSelector((state)=>state.auth.mode)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [visible,setVisible] = useState(false)


  return (
    <nav>
      <div className='logo'><img src={logo} alt='no' width={100} /></div>
      <div className='navbar' >
        {mode === "light"? <MdModeNight className='icons' onClick={()=>{dispatch(setMode())}} title='Dark Mode' /> : <MdLightMode className='icons'title='Light Mode'  onClick={()=>{dispatch(setMode())}} /> }
        <FaUserFriends className='icons' onClick={()=>{navigate("/friends",{state:{suggestons:suggestions}})}} title='Friends' />
        <BiMessageRoundedDots className='icons' title='Messages' onClick={()=>{navigate("/messenger")}} />
    
        <FaBars className='icons' title='check More' onClick={()=>setVisible(true)} />
        <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
           <BarButtons id={id} setVisible={setVisible} />
        </Modal>
      </div>
    </nav>
  )
}

export default Navbar
