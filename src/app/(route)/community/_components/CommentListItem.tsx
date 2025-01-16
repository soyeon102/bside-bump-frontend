"use client";

import { EmptyHeartIcon, HeartIcon } from "@/components/icons";
import { useState } from "react";

const CommentListItem = ({ comment }: { comment: string }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-gray01">익명 123456</p>
        <p className="text-xs text-gray05">13분 전</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-gray02 flex-1">{comment}</p>
        <div className="flex items-center flex-col">
          <button onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <HeartIcon /> : <EmptyHeartIcon />}
          </button>
          <p className="text-xs text-gray05">123</p>
        </div>
      </div>
      <button className="text-xs text-gray05 w-fit">신고하기</button>
    </div>
  );
};

export default CommentListItem;
