"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";

const AskConditionText = () => {
  const { thatItemName, thatItemPrice } = useStore();

  return (
    <>
      <p className="text-title-lg mb-1">
        {thatItemName} {Number(thatItemPrice).toLocaleString()}원이요?
        <Image
          src="/imgs/emoji-surprise.png"
          alt="surprise-emoji"
          width={26}
          height={26}
          className="inline-block ml-1 align-text-top"
        />
      </p>
      <p className="text-title-lg">제 생각에는...</p>
    </>
  );
};

export default AskConditionText;
