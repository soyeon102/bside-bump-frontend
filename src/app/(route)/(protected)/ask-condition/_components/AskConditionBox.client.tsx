"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@/components/icons";
import { useStore } from "@/store/useStore";

import { Condition } from "@/types/item";

interface AskConditionBoxProps {
  topic: string;
  text: string;
  imgSrc: string;
  conditionType: Condition;
}

const AskConditionBox = ({
  topic,
  text,
  imgSrc,
  conditionType,
}: AskConditionBoxProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { setSelectCondition } = useStore();

  const handleClickBox = () => {
    if (conditionType === "EXPENSIVE") {
      setSelectCondition("EXPENSIVE");
    } else if (conditionType === "MORE") {
      setSelectCondition("MORE");
    }
  };

  return (
    <div
      className="bg-gray04 px-3 py-5 rounded-2xl flex items-center hover:shadow-innerBorder"
      onClick={handleClickBox}
    >
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
      <ChevronRightIcon />
    </div>
  );
};

export default AskConditionBox;
