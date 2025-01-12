"use client";

import Lottie from "lottie-react";
import homeAnimation from "@public/animation/home.json";

const HomeAnimation = () => {
  return (
    <div className="w-[calc(100%+3rem)] absolute top-0 -z-10 -left-6">
      <Lottie animationData={homeAnimation} />
    </div>
  );
};

export default HomeAnimation;
