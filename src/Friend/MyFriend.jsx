import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileById} from '../state/user'
import { FaUserAlt } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'

const override: CSSProperties = {
  width:"100%",
  display:"flex",
  height:"100vh",
  justifyContent:"center",
  paddingTop:"1rem",
  // paddingLeft:"2rem"
};

const MyFriend = ({item,scrollUp}) => {
    const {loading} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    let [color, setColor] = useState("#b766f5");
    const [myid,setMyId] = useState()
    useEffect(()=>{
      const {_id} = JSON.parse(localStorage.getItem("user"))
      setMyId(_id)
    },[])
  const onClickHandler = (e) =>{
    e.preventDefault()
    scrollUp()
    dispatch(getUserProfileById({ id:item._id, myid }))
  }
  return (<>
   { loading?<PulseLoader color={color} size={20} loading={loading} cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/> :
    <div className='friend'>
    {item?.profilePic?<img src={item?.profilePic}/>:<FaUserAlt style={{width:"2rem", height:"2rem",border:"2px silid black",borderRadius:"100%"}} />}
    <div className='info'>
        <h3 onClick={onClickHandler} >{item?.username}</h3>
        <p>{item?.coursename} | {item?.stream}</p>
    </div>
    </div>
    }
    </>)
}

export default MyFriend
