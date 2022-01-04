import React, { Fragment, useEffect, useState } from "react";
import "./NewPost.css";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideocamIcon from "@mui/icons-material/Videocam";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import UploadIcon from "@mui/icons-material/Upload";
import FileIcon from "@mui/icons-material/FileCopy";
import { useDispatch, useSelector } from "react-redux";
import { userNewPost } from "../../../reduxStore/actions/PostAction";
import { notifySuccess } from "../../../utils/Messages";

const MyPost = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.mypost);
  const data = JSON.parse(localStorage.getItem("newPostInputs"));
  const [inputs, setInputs] = useState({
    text: data ? data.text : "",
  });

  const { text } = inputs;
  const UploadNewPost = (e) => {
    e.preventDefault();
    dispatch(userNewPost({text}));
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    localStorage.setItem("newPostInputs", JSON.stringify(inputs));
  };
  useEffect(() => {
    const newpostBtn = document.querySelector(".share-new-post-button");
    const modalBox = document.querySelector(".crate-new-post__modal");
    newpostBtn.addEventListener("click", () => {
      modalBox.classList.add("open");
    });

    window.addEventListener("click", function (e) {
      if (e.target === modalBox) {
        modalBox.classList.remove("open");
      }
    });
    if (message) {
      notifySuccess(message);
      modalBox.classList.remove("open");
    }
  }, [message]);
  return (
    <Fragment>
      <div className="share-new-post">
        <div className="share-new-post-entery-box">
          <div className="share-new-post-user">
            <img src="" alt="" />
          </div>
          <button className="share-new-post-button">Start a Post</button>
        </div>
        <div className="share-new-post-media-link">
          <div className="share-new-post-media-option">
            <button>
              <span className="share-new-post-media-photo">
                <InsertPhotoIcon />
              </span>
              Photo
            </button>
          </div>
          <div className="share-new-post-media-option">
            <button>
              <span className="share-new-post-media-video">
                <VideocamIcon />
              </span>
              Video
            </button>
          </div>
          <div className="share-new-post-media-option">
            <Link to="">
              <span className="share-new-post-media-event">
                <EventIcon />
              </span>
              Event
            </Link>
          </div>
          <div className="share-new-post-media-option">
            <Link to="">
              <span className="share-new-post-media-article">
                <ArticleIcon />
              </span>
              Write Article
            </Link>
          </div>
        </div>
      </div>
      <div className="crate-new-post__modal">
        <div className="create-new-post">
          <h3 className="new-post__header">create new post</h3>
          <form className="create-new-post__form" onSubmit={UploadNewPost}>
            <textarea
              placeholder="Type a massage"
              rows={3}
              id="new-post-description"
              className="new-post-description"
              name="text"
              value={inputs.text}
              onChange={onChange}
            />
            <input
              type="file"
              id="new-post-media"
              className="new-post-media"
              hidden
            />
            <label htmlFor="new-post-media">
              file <FileIcon />
            </label>
            <button type="submit">
              Upload <UploadIcon />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPost;
