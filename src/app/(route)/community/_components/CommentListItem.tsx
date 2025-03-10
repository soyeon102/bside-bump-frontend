/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { EmptyHeartIcon, HeartIcon } from "@/components/icons";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentListItem = ({
  boardId,
  comment,
  createdAt,
}: {
  boardId: string;
  comment: string;
  createdAt: string;
}) => {
  // const router = useRouter();
  // const tempCommentId = 1;

  // const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-gray01">익명</p>
        <p className="text-xs text-gray05">{formatRelativeTime(createdAt)}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-gray02 flex-1">{comment}</p>
        {/* <div className="flex items-center flex-col">
          <button onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <HeartIcon /> : <EmptyHeartIcon />}
          </button>
          <p className="text-xs text-gray05">123</p>
        </div> */}
      </div>
      {/* <button
        className="text-xs text-gray05 w-fit"
        onClick={() =>
          router.push(`${boardId}/report?commentId=${tempCommentId}`)
        }
      >
        신고하기
      </button> */}
    </div>
  );
};

export default CommentListItem;
