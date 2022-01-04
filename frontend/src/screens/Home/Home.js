import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchallPost } from "../../reduxStore/actions/PostAction";
import Chat from "./components/Chats/Chat";
import Post from "../../../../backend/Models/UserPost";
import MyPost from "./components/Posts/NewPost";

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
        {post && post.map((data) => <Post key={data._id} posts={data} />)}
        <Chat />
      </div>
    </Fragment>
  );
};

export default Home;
