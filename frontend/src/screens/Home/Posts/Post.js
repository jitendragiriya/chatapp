import React, { Fragment, useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOhteruserDetails } from "../../../reduxStore/actions/UserAction";
import { clearAllmsg } from "../../../reduxStore/actions/ChatingAction";

const Post = ({ posts }) => {
  const dispatch = useDispatch();
  const maxlength = 200;
  const [showmore, setShowmore] = useState(true);
  const showMore = () => {
    setShowmore(!showmore);
  };

  const openChat = () => {
    document
      .querySelector(".msg-overlay-bubble__message-box")
      .classList.add("open-chat");
  };

  const findUser = (id) => {
    dispatch(getOhteruserDetails(id));
  };

  const clearmsg = () => {
    dispatch(clearAllmsg());
  };

  return (
    <Fragment>
      {posts ? (
        <div className="new-work-post">
          <div className="new-work-post-user-details">
            <Link to={`user/${posts.user._id}`}>
              <div className="new-work-post-user-profile">
                <img src="" alt="" />
              </div>
            </Link>
            <div className="new-work-post-user__personal-details">
              <span>
                {`${posts.user.first_name}` + " " + `${posts.user.last_name}`}
              </span>
              <span>{posts.user.profession}</span>
            </div>
          </div>
          <div className="new-work-post-about">
            <p className="new-work-post-description">
              {posts.text && posts.text.length > maxlength
                ? posts.text.substring(0, maxlength - 3) + "..."
                : posts.text}
              {posts.text > maxlength ? (
                <button
                  className="new-work-post-desc-see-more"
                  onClick={showMore}
                >
                  {showmore ? "...see more" : "...see less"}
                </button>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="new-work-post-media">
            {posts.img && <img src={posts.img} alt="" />}
          </div>
          <div className="share-social-action-bar">
            <div className="share-new-post-media-option">
              <button>
                <span className="share-new-post-media-photo">
                  <ThumbUpIcon />
                </span>
                Like
              </button>
            </div>
            <div className="share-new-post-media-option">
              <button
                onClick={() => {
                  clearmsg();
                  openChat();
                  findUser(posts.user._id);
                }}
              >
                <span className="share-new-post-media-video">
                  <CommentIcon />
                </span>
                Message
              </button>
            </div>
            <div className="share-new-post-media-option">
              <button to="">
                <span className="share-new-post-media-event">
                  <ShareIcon />
                </span>
                Share
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Post;
