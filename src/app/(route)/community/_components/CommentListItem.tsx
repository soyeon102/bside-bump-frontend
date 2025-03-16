"use client";

import { EmptyHeartIcon, HeartIcon } from "@/components/icons";
import { API_URL } from "@/constants/url.const";
import { useUserIdStore } from "@/store/useStore";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  const handleClickLikeButton = (commentId: string) => {
    if (isLikedComment) {
      deleteCommentLike.mutate(commentId);
    } else {
      postCommentLike.mutate(commentId);
    }
  };

  return (
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
        onClick={() => router.push(`${boardId}/report?commentId=${commentId}`)}
      >
        신고하기
      </button>
    </div>
  );
};

export default CommentListItem;
