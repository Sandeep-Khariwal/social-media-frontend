import { BrowserRouter , Routes , Route } from "react-router-dom";
import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import HomePage from "./scenes/homepage/HomePage";
import Login from "./scenes/login/Login"
import Profile from "./scenes/profile/Profile"
import Registration from "./scenes/login/Registration";
import Createprofile from "./scenes/profile/Createprofile";

import Search from "./component/Search";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import MyProfile from "./scenes/profile/MyProfile";
import Notifications from "./scenes/homepage/Notifications";
import CreatePosts from "./scenes/homepage/CreatePosts";


/* STYLING */
import "./App.css"
import "./styles/auth/login.scss"
import "./styles/auth/register.scss"

import "./styles/home/home.scss"
import "./styles/home/navbar.scss"
import "./styles/home/barbuttons.scss"
import "./styles/home/bottomnav.scss"
import "./styles/home/post.scss"
import "./styles/home/story.scss"
import "./styles/home/friend.scss"
import "./styles/home/search.scss"
import "./styles/home/comment.scss"
import "./styles/home/notifications.scss"
import "./styles/home/createpost.scss"

import "./styles/profile/profile.scss"
import "./styles/profile/myprofile.scss"
import "./styles/profile/createprofile.scss"
import "./styles/profile/myposts.scss"

import "./styles/layout/layout.scss"
import "./styles/Comment/usercomment.scss"

import "./styles/messanger/messenger.scss"
import "./styles/messanger/conversation.scss"
import MyAllPosts from "./scenes/profile/MyAllPosts";
import UserProfile from "./scenes/profile/UserProfile";
import SavedPosts from "./scenes/navbar/SavedPosts";
import AllFriends from "./Friend/AllFriends";
import Messanger from "./scenes/Massenger/Messanger";


const override: CSSProperties = {
  display: "block",
  display:"flex",
  height:"100vh",
  justifyContent:"center",
  alignItems:"center"
  // backgroundColor:"#282c34"
};

function App() {

  const [token,setTokenn] = useState("")
  const {status , loading }= useSelector((state)=>state.auth)
  let [color, setColor] = useState("#b766f5");
  const[tempload,setTempLoad] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setTokenn(token);
    setTempLoad(false)

    // <ClipLoader color={color} loading={loading} cssOverride={override} size={150} aria-label="Loading Spinner" data-testid="loader"/>
  },[])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ token? <HomePage/> : tempload?<PulseLoader color={color} size={40} loading={loading} cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/> :<Login/>}/>
        <Route path="/register" element={ <Registration/> }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={loading?<PulseLoader color={color} size={40} loading={loading} cssOverride={override} aria-valuetext="Loading" aria-label="Loading Spinner" data-testid="loader"/> : <HomePage/> }/>
        <Route path="/editprofile/:id" element={ <Createprofile/> } />
        <Route path="/profile" element={<MyProfile/> }/>
        <Route path="/search" element={ <Search/> }/>
        <Route path="/profile/:userId" element={ <Profile/> }/>
        <Route path="/notifications" element={ <Notifications/>}/>
        <Route path="/post/:id" element={<CreatePosts/>} />
        <Route path="/myallposts" element={<MyAllPosts/> } />
        <Route path="/savedposts" element={<SavedPosts/> } />
        <Route path="/friends" element={<AllFriends/> } />
        <Route path="/userprofile" element={<UserProfile/> }/>

        <Route path="/messenger" element={<Messanger/> }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
