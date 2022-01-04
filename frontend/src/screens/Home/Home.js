import React, { Fragment, useEffect } from "react";
import "./Home.css";
import NewPost from "./components/Posts/NewPost";
import Post from "./components/Posts/Post";
import Chat from "./components/Chats/Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchallPost } from "../../reduxStore/actions/PostAction";

const Home = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.allpost);

  useEffect(() => {
    dispatch(fetchallPost());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="home__content">
        <NewPost />
        {post && post.map((data) => <Post key={data._id} posts={data} />)}
        <Chat />
      </div>
    </Fragment>
  );
};

export default Home;
