"use client";

import Image from "next/image";
import RightArrow from "@public/icons/chevron-right.svg";
import { useRef } from "react";

const ConditionBox = ({
  topic,
  text,
  imgSrc,
}: {
  topic: string;
  text: string;
  imgSrc: string;
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="bg-gray04 px-3 py-5 rounded-2xl flex items-center hover:shadow-innerBorder">
      <Image
        src={imgSrc}
        alt={topic}
        width={60}
        height={60}
        style={{ width: "auto" }}
      />
      <div className="flex-1 mx-3">
        <p className="text-sm text-gray02 mb-2">{topic}</p>
        <p
          className="text-title-sm text-gray01 leading-tight break-keep"
          ref={textRef}
        >
          {text}
        </p>
      </div>
      <RightArrow />
    </div>
  );
};

export default ConditionBox;
