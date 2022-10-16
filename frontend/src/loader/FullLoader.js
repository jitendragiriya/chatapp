import React from "react";

const FullLoader = () => {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-green-300 to-green-200 flex items-center justify-center">
        <div className="w-64 max-w-[90%] h-2 rounded bg-gray-200 relative">
          <div className="w-[20%] h-full rounded bg-gradient-to-r from-pink-500 to-indigo-500 animate-[alternat_3s_infinite] absolute top-0 left-0"></div>
        </div>
      </div>
    </>
  );
};

export default FullLoader;
