import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchallPost } from "../../reduxStore/actions/PostAction";
import Post from "./Posts/Post";
import MyPost from "./Posts/NewPost";
import Chat from "./Chats/Chat";

const Home = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.allpost);

  useEffect(() => {
    dispatch(fetchallPost());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="home__content">
        <MyPost />
        <Chat />
        {post && post.map((data) => <Post key={data._id} posts={data} />)}
      </div>
    </Fragment>
  );
};

export default Home;
