import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import Friend from '../Friend/Friend'
import { useDispatch, useSelector } from 'react-redux'
import { searchProfileByName } from '../state'
import PulseLoader from 'react-spinners/PulseLoader'
import Bottomnav from '../scenes/navbar/Bottomnav'

const override: CSSProperties = {
  width:"100%",
  display:"flex",
  height:"100vh",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#1d2b3a"
};

const Search = () => {

  const {loading , search , mode } = useSelector((state)=>state.auth)

  const [text,setText] = useState("");
  const dispatch = useDispatch();
  const [myId,setMyId] = useState(null)
  let [color, setColor] = useState("#b766f5");

  useEffect(()=>{
    const user = localStorage.getItem("user");
    const {_id} = JSON.parse(user)
    setMyId(_id)
  },[])

  return (
    <div className='search' style={mode === 'light'? {backgroundColor:"#FAF9F6"}:{backgroundColor:"#282c34" , color:"white" }} >
      <form>
        <input type='search' name='text' placeholder='Search...' onChange={(e)=>setText(e.target.value)}/>
        <button onClick={(e)=>{e.preventDefault(); dispatch(searchProfileByName({myId,text}))}} ><FaSearch/> </button>
      </form>
      <div className='searched' >
        <h2>{search.length< 1? "Result Not Found" :"Result Found"}</h2>
        {
          loading ? <PulseLoader color={color} size={40} loading={loading } cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/>
          : search && search.map((item)=>(
            <Friend key={item._id} item={item} />
          ))
        }
      </div>
    <div className='Bottomnav' >
      <Bottomnav/>
    </div>
    </div>
  )
}

export default Search
