"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@public/animation/loading.json";

const ResultPageLoading = () => {
  console.log("ResultPage Loading");

  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center">
      <div className="text-title-lg text-primary04 mb-7">
        결과지를 만들고 있어요
      </div>
      <Lottie animationData={loadingAnimation} style={{ height: 164 }} />;
    </div>
  );
};

export default ResultPageLoading;
