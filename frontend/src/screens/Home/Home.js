import React, { Fragment } from "react";
import "./Home.css";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import Chat from "./components/chats/Chat";

const Home = () => {
  return (
    <Fragment>
      <div className="home__content">
        <NewPost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Chat />
      </div>
    </Fragment>
  );
};

export default Home;
