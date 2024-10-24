"use client";

import { CldImage } from "next-cloudinary";

const HomeAnimation = () => {
  return (
    <CldImage
      width={300}
      height={60}
      format="gif"
      src="animation-wallet_fnoph2"
      alt="home animation"
      style={{ width: "auto" }}
    />
  );
};

export default HomeAnimation;
