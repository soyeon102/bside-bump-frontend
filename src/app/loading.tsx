"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@public/animation/loading.json";

const Loading = () => {
  return (
    <div className="h-dvh w-full flex justify-center items-center">
      <Lottie animationData={loadingAnimation} style={{ height: 164 }} />;
    </div>
  );
};

export default Loading;
