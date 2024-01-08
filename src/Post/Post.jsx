import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { Badge, Modal } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { BsHeartFill, BsFillBookmarkFill } from "react-icons/bs";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import PostThreeDot from "./PostThreeDot";
import PulseLoader from "react-spinners/PulseLoader";
import {
  getLikesAndComments,
  likeAndDislike,
  setComments,
} from "../state/user";
import { letSavePosts } from "../state/post";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const override: CSSProperties = {
  // display: "block",
  width: "100%",
  display: "flex",
  height: "75vh",
  backgroundColor: "#1d2b3a",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor:"#282c34"
};

const Post = ({ post, bookMark }) => {
  const { comments, likes } = post;
  const mode = useSelector((state) => state.auth.mode);
  const navigate = useNavigate();
  var totalLike = Object.keys(likes)?.length;
  const [allComment,setAllComment] = useState(comments)

  const totalComments = allComment?.length;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [imgLoad, setImgLoad] = useState(true);
  const [photo, setPhoto] = useState("");

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  var [isLike, setLike] = useState(false);
  const [userId, setId] = useState(null);
  const [colour, setColour] = useState(bookMark || false);
  const postId = post._id;

  let [color, setColor] = useState("#b766f5");
  useEffect(() => {
    const user = localStorage.getItem("user");
    const me = JSON.parse(user);
    setId(me?._id);
    const postLikes = Object.keys(likes)
    const present = postLikes.includes(me?._id)
    setLike(present)
    if (post.photo) {
      setPhoto(post.photo);
      setImgLoad(false);
    }

    dispatch(getLikesAndComments(post?._id));
  }, [!allComment]);

  /* REQUEST FOR LIKES AND DISLIKES */
  const likesAndDislikes = (e) => {
    e.preventDefault();
    try {
      setLike(!isLike);
      const formData = new FormData();
      formData.append("userId", userId);
      const id = post._id;
      dispatch(likeAndDislike({ id, formData }));
    } catch (error) {
      console.log("Error in like and Dislike", error);
    }
  };

  const onClickSavePost = (e) => {
    e.preventDefault();
    setColour(!colour);
    dispatch(letSavePosts({ userId, postId })).then((response) => {
      const { success, message } = response.payload;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div
      className="post"
      style={
        mode === "light"
          ? { backgroundColor: "#FAF9F6", color: "black" }
          : { backgroundColor: "#282c34", color: "#FAF9F6" }
      }
    >
      <Toaster />
      <div className="account">
        {post.userPhoto ? (
          <img src={post?.userPhoto} />
        ) : (
          <FaUserAlt
            style={{
              width: "2rem",
              height: "2rem",
              border: "2px silid black",
              borderRadius: "100%",
            }}
          />
        )}
        <div className="info">
          <h3
            onClick={() =>
              navigate("/userprofile", { state: { userId: post.userId } })
            }
          >
            {post?.username}
          </h3>
          {/* <p>{post?.location}</p> */}
        </div>
        <div>
          <HiOutlineDotsVertical
            onClick={() => setVisible1(true)}
            style={{ cursor: "pointer" }}
          />
          <Modal
            onCancel={() => setVisible1(false)}
            footer={null}
            open={visible1}
          >
            <PostThreeDot
              setVisible={setVisible1}
              id={post._id}
              userId={userId}
            />
          </Modal>
        </div>
      </div>
      <div className="desc">
        <p>{post?.description}</p>
      </div>
      {imgLoad && photo ? (
        <PulseLoader
          color={color}
          size={40}
          loading={imgLoad}
          cssOverride={override}
          aria-valuetext="Loading"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        photo?<img src={photo} alt="not found" />:""
      )}
      <div className="social">
        <p onClick={()=>navigate("/likes",{state:{likes:likes}})} >{`${
          isLike
            ? `You and ${totalLike} people Liked this Post`
            : `${totalLike} people Liked this Post`
        }`}</p>
        <div className="icon">
          <div className="likeComment">
            <BsHeartFill
              onClick={likesAndDislikes}
              className="icons"
              style={
                mode === "light"
                  ? { color: isLike ? "red" : "#444" }
                  : { color: isLike ? "red" : "white" }
              }
            />
            <Badge className="icons" count={totalComments} overflowCount={10}>
              <MdComment
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(true);
                  // dispatch(setComments(comments));
                }}
                title="Comments"
                style={
                  mode === "light" ? { color: "black" } : { color: "white" }
                }
              />
            </Badge>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <Comment id={post._id} userId={userId} comments={allComment} setComments={setAllComment} />
          </Modal>
          <BsFillBookmarkFill
            onClick={onClickSavePost}
            className="icons"
            style={
              mode === "light"
                ? { color: colour ? "#8F00FF" : "black" }
                : { color: colour ? "#8F00FF" : "white" }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
