import React, { useEffect, useRef, useState } from "react";

import Navbar from "../navbar/Navbar";
import Bottomnav from "../navbar/Bottomnav";
import Profile from "../profile/Profile";
import Post from "../../Post/Post";
import Friend from "../../Friend/Friend";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../state/post";
import PulseLoader from "react-spinners/PulseLoader";
import { suggestions } from "../../state/Massanger";
import { setMode } from "../../state";

const override: CSSProperties = {
  width: "100%",
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  paddingTop: "1rem",
};

const HomePage = () => {
  const mode = useSelector((state) => state.auth.mode);
  // const { suggestions } = useSelector((state) => state.user);
  const { loading, allPosts , suggestions } = useSelector((state) => state.post);

  const [id, setId] = useState();
  const [user, setUser] = useState();
  const [suggest, setSuggest] = useState([]);
  const dispatch = useDispatch();
  const [friend, setFriends] = useState([]);
  let [color, setColor] = useState("#b766f5");
  // const socket = useRef(io("ws://localhost:8900"));

  useEffect(() => {
    // socket.current = io("ws://localhost:8900")
    const post = localStorage.getItem("user");
    const user = JSON.parse(post);
    const mode = localStorage.getItem("mode");
    dispatch(setMode(mode));
    getAllPost(user?._id);
    setUser(user);
  }, []);

  const getAllPost = (id) => {
    dispatch(getAllPosts(id));
  };
  return (
    <div
      className="home"
      style={
        mode === "light"
          ? { backgroundColor: "#FAF9F6", color: "black" }
          : { backgroundColor: "#282c34", color: "#FAF9F6" }
      }
    >
      <div className="navbar">
        <Navbar id={user?._id} suggestions={suggestions} />
      </div>
      {loading ? (
        <PulseLoader
          color={color}
          size={20}
          loading={loading}
          cssOverride={override}
          aria-valuetext="Loading"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="content">
          <div className="profile">
            <Profile />
          </div>
          <div className="posts">
            {allPosts &&
              allPosts.map((post,index) => <Post key={index} post={post} />)}
          </div>
          <div className="friends">
            <div
              className="suggestions"
              style={
                mode === "light"
                  ? { backgroundColor: "#FAF9F6", color: "black" }
                  : { backgroundColor: "#282c34", color: "#FAF9F6" }
              }
            >
              <h4>Sugestions</h4>
              {suggestions &&
                suggestions.map((suggest,index) => (
                  <Friend key={index} item={suggest} />
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="Bottomnav">
        <Bottomnav />
      </div>
    </div>
  );
};
export default HomePage;
