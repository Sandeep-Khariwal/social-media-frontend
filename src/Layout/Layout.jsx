import React from 'react'
import { ToastContainer} from 'react-toastify';
import Navbar from '../scenes/navbar/Navbar';
import Bottomnav from '../scenes/navbar/Bottomnav';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
    const mode = useSelector((state)=>state.auth.mode)
  return (
    <div className='layout' style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#222" , color:"white" }} >
    {/* <Helmet>
      <meta charSet='utf-8'/>
      <title>{title}</title>
    </Helmet> */}
  <div className='navbar' ><Navbar/></div>
    <main className='content'>
     <ToastContainer/>
     {children}
    </main>
  <div className='bottomnav' ><Bottomnav/></div>
  </div>
  )
}

export default Layout
