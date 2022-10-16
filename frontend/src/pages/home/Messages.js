import React from "react"; 
import { format } from "timeago.js";

const Messages = ({ message, user, time }) => {
  if (user) {
    return (
      <>
        <p className="relative px-2 py-1 w-fit rounded  max-w-[80%] mx-2 my-4 mb-2 ml-auto bg-blue-300">
          {message}
        </p>
        <div className="text-xs my-2 text-white text-right">{format(time)}</div>
      </>
    );
  } else {
    return (
      <>
        <p className="relative px-2 py-1 w-fit rounded  max-w-[80%] mx-2 my-4 mb-2 bg-green-300">
          {message}
        </p>
        <div className="text-xs my-2 text-white">{format(time)}</div>
      </>
    );
  }
};

export default Messages;
