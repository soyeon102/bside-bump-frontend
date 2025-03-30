/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
import { EmptyHeartIcon, HeartIcon, RadioIcon } from "@/components/icons";
import { API_URL } from "@/constants/url.const";
import { useUserIdStore } from "@/store/useStore";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const reasonList = [
  { id: 1, text: "본문과 관련 없는 내용" },
  { id: 2, text: "욕설, 비방, 음란 내용" },
  { id: 3, text: "광고 등 상업적 홍보" },
  { id: 4, text: "개인정보 유출" },
  { id: 5, text: "기타" },
];

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
  commentLikes: { userId: string }[];
}

interface CommunityData {
  comments: Comment[];
  id: string;
  description: string;
  createdAt: string;
  resultId: string;
  userId: string;
  optionCounts?: Record<string, number>;
  pollItems?: Array<{ option: string }>;
  pollEndAt?: string;
  polls?: {
    createdAt: string;
    id: string;
    option: string;
    postId: string;
    updatedAt: string;
    userId: string;
  }[];
  result: {
    id: string;
    name: string;
    price: number;
    recommendationType: "MORE" | "EXPENSIVE";
    suggestedItems: Array<{
      name: string;
      price: number;
      iconUrl: string;
      percentage: number;
      quantity: number;
      change: number;
    }>;
  };
}

const CommentListItem = ({
  commentId,
  boardId,
  comment,
  createdAt,
  commentLikes,
}: {
  commentId: string;
  boardId: string;
  comment: string;
  createdAt: string;
  commentLikes: {
    userId: string;
  }[];
}) => {
  const router = useRouter();
  const userId = useUserIdStore((state) => state.userId) as string;
  const isLikedComment = commentLikes.some((like) => like.userId === userId);
  const queryClient = useQueryClient();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<number>(1);
  const [etcReason, setEtcReason] = useState<string>("");
  const [isToast, setIsToast] = useState<boolean>(false);

  const postCommentLike = useMutation({
    mutationFn: async (commentId: string) => {
      if (!userId) return;
      await fetch(`${API_URL}/comment/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    },
    onMutate: async (commentId) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: ["communityItem", boardId] });
      const previousData = queryClient.getQueryData<CommunityData>([
        "communityItem",
        boardId,
      ]);

      queryClient.setQueryData<CommunityData>(
        ["communityItem", boardId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    commentLikes: [...comment.commentLikes, { userId }],
                  }
                : comment
            ),
          };
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["communityItem", boardId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["communityItem", boardId] });
    },
  });

  const deleteCommentLike = useMutation({
    mutationFn: async (commentId: string) => {
      await fetch(`${API_URL}/comment/${commentId}/like?userId=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["communityItem", boardId] });
      const previousData = queryClient.getQueryData<CommunityData>([
        "communityItem",
        boardId,
      ]);

      queryClient.setQueryData<CommunityData>(
        ["communityItem", boardId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    commentLikes: comment.commentLikes.filter(
                      (like) => like.userId !== userId
                    ),
                  }
                : comment
            ),
          };
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["communityItem", boardId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["communityItem", boardId] });
    },
  });

  const postReport = useMutation({
    mutationFn: async () => {
      const reason =
        selectedReason === 5
          ? etcReason
          : reasonList.find((reason) => reason.id === selectedReason)?.text;

      await fetch(`${API_URL}/comment/${commentId}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, reason }),
      });
    },
    onSuccess: () => {
      setIsToast(true);
      setIsReportModalOpen(false);
      setSelectedReason(1);
      setEtcReason("");
    },
  });

  const handleClickLikeButton = (commentId: string) => {
    if (isLikedComment) {
      deleteCommentLike.mutate(commentId);
    } else {
      postCommentLike.mutate(commentId);
    }
  };

  const handleClickReport = () => {
    postReport.mutate();
  };

  useEffect(() => {
    if (isToast) {
      setTimeout(() => {
        setIsToast(false);
      }, 2500);
    }
  }, [isToast]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-gray01">익명</p>
          <p className="text-xs text-gray05">{formatRelativeTime(createdAt)}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-gray02 flex-1">{comment}</p>
          <div className="flex items-center flex-col">
            <button onClick={() => handleClickLikeButton(commentId)}>
              {isLikedComment ? <HeartIcon /> : <EmptyHeartIcon />}
            </button>
            <p className="text-xs text-gray05">{commentLikes.length || 0}</p>
          </div>
        </div>
        <button
          className="text-xs text-gray05 w-fit"
          onClick={() => setIsReportModalOpen(true)}
        >
          신고하기
        </button>
      </div>

      <BottomSheet
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      >
        <div className="flex flex-col justify-between flex-1 relative">
          <div>
            <p className="text-gray01 font-bold mb-3">신고 사유</p>
            <ul className="flex flex-col gap-2 mb-3">
              {reasonList.map((reason) => (
                <li key={reason.id}>
                  <button
                    onClick={() => setSelectedReason(reason.id)}
                    className="flex items-center gap-3"
                  >
                    {selectedReason === reason.id ? (
                      <RadioIcon className="flex-shrink-0" />
                    ) : (
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-gray03"></span>
                    )}
                    <p className="text-gray-01 text-sm text-left">
                      {reason.text}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative">
              <textarea
                value={etcReason}
                onChange={(e) => setEtcReason(e.target.value)}
                className="w-full h-36 text-sm bg-gray04 rounded-lg p-4 h-textBox resize-none focus:outline-none text-gray01"
                placeholder="200자 이내로 신고 내용을 입력해주세요"
                maxLength={200}
                disabled={selectedReason !== 5}
              />
              <div className="text-right text-gray03 text-xs">
                {etcReason.length.toLocaleString()}/200
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button color="plain" onClick={handleClickReport}>
              신고하기
            </Button>
          </div>
        </div>
      </BottomSheet>
      {isToast && (
        <div
          className={`w-full flex justify-center absolute z-50 bottom-24 left-0 right-0 animate-fade-in`}
        >
          <div className="bg-gray02 bg-opacity-80 text-white font-bold text-sm px-5 py-3 rounded-half">
            댓글이 신고되었어요
          </div>
        </div>
      )}
    </>
  );
};

export default CommentListItem;
