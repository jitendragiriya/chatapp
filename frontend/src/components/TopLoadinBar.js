import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const TopLoadinBar = ({ newProgress }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(newProgress);
  }, [setProgress, newProgress]);
  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default TopLoadinBar;
