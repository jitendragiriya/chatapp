import React from "react";

const OneFriend = ({ friend }) => {
  return (
    <>
      {friend ? (
        <div className="flex w-full items-center p-2 cursor-pointer hover:bg-gray-100">
          <div className="h-10 w-10 rounded-full bg-[#58a0ffee] text-white mr-2 flex items-center justify-center uppercase font-bold">
            {friend && friend.friend && friend.friend.username.slice(0,1)}
          </div>
          <div>{friend && friend.friend && friend.friend.username}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OneFriend;
