import React, { useEffect, useState } from "react";
import Post from "../../Post/Post";
import Bottomnav from "../navbar/Bottomnav";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MyAllPosts = () => {
  const location = useLocation();
  const { posts } = location.state;
  const { mode } = useSelector((state) => state.auth);

  return (
    <div
      className="myallposts"
      style={
        mode === "light"
          ? { backgroundColor: "#FAF9F6" }
          : { backgroundColor: "#282c34", color: "white" }
      }
    >
      <h3>
        {posts?.length > 0 ? `Found ${posts?.length} Posts` : "No Post yet"}
      </h3>
      <div className="myposts">
        <div className="posts">
          {posts &&
            posts.map((post, index) => <Post key={index} post={post} />)}
        </div>
      </div>
      <div className="navbar">
        <Bottomnav />
      </div>
    </div>
  );
};

export default MyAllPosts;
