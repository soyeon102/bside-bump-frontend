"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@public/animation/loading.json";

const Loading = () => {
  console.log("LOADING");
  return (
    <div className="flex-1 w-full flex justify-center items-center bg-white">
      <Lottie animationData={loadingAnimation} style={{ height: 164 }} />;
    </div>
  );
};

export default Loading;
