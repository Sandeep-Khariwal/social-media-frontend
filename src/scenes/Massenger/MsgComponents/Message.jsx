import { useSelector } from "react-redux";
import "../../../styles/messanger/msgCompo/message.scss";
import { format } from "timeago.js";

export default function Message({ message, own,myPic }) {
  const {userProfile} = useSelector((state)=>state.user)
  return (
    <div className={own?"message own ":"message" }>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own?myPic:userProfile?.profilePic}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}