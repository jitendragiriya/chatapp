import React, { Fragment, useState } from "react";
import "./Post.css";
import img4 from "./number-3-three-260nw-742434955-1.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const Post = () => {
  let workdescription =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vita molestiae aperiam similique repellendus doloribus voluptatum anim commodi doloremque, quisquam facilis quis nulla atque id voluptas accusantium possimus sint recusandae, corrupti iusto illo eum sunt!  iusto illo eum sunt!";
  const maxlength = 200;

  const [showmore, setShowmore] = useState(true);
  const showMore = () => {
    setShowmore(!showmore);
  };
  return (
    <Fragment>
      <div className="new-work-post">
        <div className="new-work-post-user-details">
          <div className="new-work-post-user-profile">
            <img src="" alt="" />
          </div>
          <div className="new-work-post-user__personal-details">
            <span>Name</span>
            <span>sde at google</span>
            <span>Name</span>
          </div>
        </div>
        <div className="new-work-post-about">
          <p className="new-work-post-description">
            {workdescription.length > maxlength && showmore
              ? workdescription.substring(0, maxlength)
              : workdescription}
            {workdescription.length > maxlength ? (
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
          <img src={img4} alt="" />
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
            <button>
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
    </Fragment>
  );
};

export default Post;
