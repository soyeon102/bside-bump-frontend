"use client";

import Image from "next/image";
import RightArrow from "@public/icons/chevron-right.svg";
import { useEffect, useRef, useState } from "react";

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
  // const [lastLineHTML, setLastLineHTML] = useState<string | null>(null);

  // useEffect(() => {
  //   if (textRef.current) {
  //     const paragraph = textRef.current;
  //     const range = document.createRange();
  //     const textNode = paragraph.firstChild as Text;

  //     // 텍스트 노드의 마지막 줄 계산
  //     range.setStart(textNode, 0);
  //     range.setEnd(textNode, textNode.length);

  //     const lines = paragraph.innerText.split("\n");
  //     const lastLine = lines[lines.length - 1];
  //     console.log(lastLine);

  //     // 마지막 줄이 있을 경우만 처리
  //     if (lastLine) {
  //       const span = document.createElement("span");
  //       span.classList.add("bg-yellow-300");
  //       span.textContent = lastLine;

  //       // 마지막 줄만 따로 저장
  //       const htmlContent = paragraph.innerHTML.replace(
  //         lastLine,
  //         span.outerHTML
  //       );
  //       setLastLineHTML(htmlContent);
  //     }
  //   }
  // }, []);

  return (
    <div className="bg-gray04 px-3 py-5 rounded-2xl flex items-center hover:shadow-innerBorder">
      <Image src={imgSrc} alt={topic} width={60} height={60} />
      <div className="flex-1 mx-3">
        <p className="text-sm text-gray02 mb-2">{topic}</p>
        <p
          className="text-title-sm text-gray01 leading-tight break-keep"
          ref={textRef}
        >
          {text}
        </p>

        {/* <p
          ref={textRef}
          className={`text-sm text-gray02 mb-2`}
          dangerouslySetInnerHTML={{
            __html: lastLineHTML || text,
          }}
        /> */}
      </div>
      <RightArrow />
    </div>
  );
};

export default ConditionBox;
