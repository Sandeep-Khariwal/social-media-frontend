import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Bottomnav from "../navbar/Bottomnav";
import Friend from "../../Friend/Friend";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { followOrUnFollow, getUserProfileById } from "../../state/user";
import { useRef } from 'react';

import PulseLoader from "react-spinners/PulseLoader";
import Profilepic from "./Profilepic";
import Bgprofilepic from "./Bgprofilepic";
import { Modal } from "antd";
import { createConversation } from "../../state/Massanger";
import MyFriend from "../../Friend/MyFriend";

const override: CSSProperties = {
  width: "100%",
  display: "flex",
  height: "1.1rem",
  justifyContent: "center",
  alignItems: "center",
};

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.userId;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [myId, setMyId] = useState(null);
  const { userProfile, follow, loading, suggestions, friends } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.auth);

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const totalPosts = userProfile?.posts?.length;
  // const totalFriends = friends?.length

  const scrollUp = ()=>{
    ref.current.scrollIntoView({behavior:"smooth",block:"start"})
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    const details = JSON.parse(user);
    const id = details?._id;

    /* GET USER DETAILS */
    getUserProfile(id);
    setMyId(id);
  }, []);

  const getUserProfile = (myid) => {
    dispatch(getUserProfileById({ id, myid }));
  };

  /* CREATING CONVERSATION */
  const startConversation = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("senderId", myId);
    data.append("receiverId", userProfile?._id);
    dispatch(createConversation(data)).then((response) => {
      const { success, conversation } = response.payload;
      if (success) {
        console.log("conversation is : ",conversation);
        navigate("/messenger", { state: { chatId: conversation[0]?._id } });
      } else {
        navigate("/messenger", { state: { chatId: conversation[0]?._id } });
      }
    });
  };
  return (
    <div
      className="myprofile"
      style={
        mode === "light"
          ? { backgroundColor: "#FAF9F6" }
          : { backgroundColor: "#282c34", color: "white" }
      }
    >
      <Modal onCancel={() => setVisible1(false)} footer={null} open={visible1}>
        <Profilepic profile={userProfile?.profilePic} visible={visible1} />
      </Modal>
      <Modal onCancel={() => setVisible2(false)} footer={null} open={visible2}>
        <Bgprofilepic profile={userProfile?.BgPic} visible={visible2} />
      </Modal>
      <div
        className="content"
        style={
          mode === "light"
            ? { backgroundColor: "#FAF9F6" }
            : { backgroundColor: "#282c34", color: "white" }
        }
      >
        <div ref={ref} className="about">
          <div className="info">
            <div className="bgimg" onClick={() => setVisible2(true)}>
              {userProfile?.BgPic ? (
                <img src={userProfile?.BgPic} alt="Not Found" />
              ) : (
                <FaUserCircle style={{ width: "50%", height: "100%" }} />
              )}
            </div>
            <div className="data-container">
              <div className="data">
                <div onClick={() => setVisible1(true)}>
                  {userProfile?.profilePic ? (
                    <img src={userProfile?.profilePic} alt="Not Found" />
                  ) : (
                    <FaUserAlt
                      style={{
                        width: "50%",
                        height: "100%",
                        border: "2px silid black",
                        borderRadius: "100%",
                      }}
                    />
                  )}
                </div>
                <div>
                  <p>{userProfile?.username}</p>
                </div>
              </div>
              <div className="profile-data">
                <div className="post-frnd">
                  <div className="postnum">
                    <h3>{totalPosts}</h3>
                    <p>Posts</p>
                  </div>
                  <div className="frnds" onClick={()=>navigate("/friends",{state:{suggestions:suggestions,id:userProfile?._id}})} >
                    <h3>{friends.length}</h3>
                    <p>Friends</p>
                  </div>
                </div>
                <div className="btns">
                  <button
                    onClick={() =>
                      navigate("/myallposts", {
                        state: { posts: userProfile?.posts },
                      })
                    }
                  >
                    Posts
                  </button>
                  <button
                    onClick={() => dispatch(followOrUnFollow({ myId, id }))}
                  >
                    {follow ? (
                      loading ? (
                        <PulseLoader
                          color="#810681"
                          size={10}
                          loading={loading}
                          cssOverride={override}
                          aria-valuetext="Loading"
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Remove"
                      )
                    ) : loading ? (
                      <PulseLoader
                        color="#810681"
                        size={10}
                        loading={loading}
                        cssOverride={override}
                        aria-valuetext="Loading"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "connect"
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bio">
              <div className="desc">
                <div className="desctxt">
                  <h3>Description : </h3>
                </div>
                <div className="descval">
                  <p>{userProfile?.bio ? userProfile.bio : "Not Mentioned"}</p>
                </div>
              </div>
              <div className="looking4">
                <div className="looktxt">
                  <h3>Looking for : </h3>
                </div>
                <div className="lookval">
                  <p>
                    {userProfile?.look ? userProfile.look : "Not Mentioned"}
                  </p>
                </div>
              </div>
              <div>
                <button onClick={startConversation}>Send Message</button>
              </div>
            </div>
          </div>
          <div
            className="skills"
            style={
              mode === "light"
                ? { backgroundColor: "#FAF9F6" }
                : { backgroundColor: "#282c34", color: "white" }
            }
          >
            <p>My Skills</p>
            <div>
              {userProfile?.skills &&
                userProfile?.skills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </div>
          </div>
        </div>
        <div className="edu-suggest">
          <div className="education">
            <div
              className="edu"
              style={
                mode === "light"
                  ? { backgroundColor: "#FAF9F6" }
                  : { backgroundColor: "#282c34", color: "white" }
              }
            >
              <h3>Education</h3>
              <div className="edu-info">
                <div className="batch">
                  <h3>
                    Batch :{" "}
                    <span>
                      {userProfile?.batch ? userProfile?.batch : "Not Saved"}
                    </span>
                  </h3>
                  <h3>
                    Year :{" "}
                    <span>
                      {userProfile?.year ? userProfile?.year : "Not Saved"}
                    </span>
                  </h3>
                </div>
                <div className="clgname">
                  <h3>College: </h3>
                  <p>{userProfile?.collegename}</p>
                </div>
                <div className="crsname">
                  <h3>Course: </h3>
                  <p>{userProfile?.coursename}</p>
                </div>
                <div className="stream">
                  <h3>Stream: </h3>
                  <p>{userProfile?.stream}</p>
                </div>
                <div className="address">
                  <h3>Address: </h3>
                  <p>{userProfile?.address}</p>
                </div>
              </div>
            </div>
            <div
              className="suggest"
              style={
                mode === "light"
                  ? { backgroundColor: "#FAF9F6" }
                  : { backgroundColor: "#282c34", color: "white" }
              }
            >
              <h3>Suggestions</h3>
              {suggestions &&
                suggestions.map((item, index) => (
                  <MyFriend key={index} item={item} scrollUp={scrollUp} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <Bottomnav />
      </div>
    </div>
  );
};

export default UserProfile;
