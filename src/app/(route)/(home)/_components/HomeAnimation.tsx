"use client";

import Lottie from "lottie-react";
import homeAnimation from "@public/animation/home.json";
import { useUserIdStore } from "@/store/useStore";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const HomeAnimation = () => {
  const userId = useUserIdStore((state) => state.userId);
  const setUserId = useUserIdStore((state) => state.setUserId);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user-id");
    if (!storedUserId && !userId) {
      setUserId(uuidv4());
    }
  }, [userId, setUserId]);

  return (
    <div className="w-[calc(100%+3rem)] absolute top-0 -z-10 -left-6">
      <Lottie animationData={homeAnimation} />
    </div>
  );
};

export default HomeAnimation;
