"use client";

import Lottie from "lottie-react";
import walletAnimation from "@public/animation/animation_wallet.json";

const HomeAnimation = () => {
  return (
    <Lottie
      loop={true}
      animationData={walletAnimation}
      height={288}
      width={288}
    />
  );
};

export default HomeAnimation;
