import { SendIcon } from "@/components/icons";
import { API_URL } from "@/constants/url.const";
import { useUserIdStore } from "@/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CommentInputProps {
  postId: string;
}

const CommentInput = ({ postId }: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const userId = useUserIdStore((state) => state.userId);
  const setUserId = useUserIdStore((state) => state.setUserId);
  const queryClient = useQueryClient();

  const postComment = useMutation({
    mutationKey: ["postComment"],
    mutationFn: async (body: { userId: string; content: string }) => {
      const res = await fetch(`${API_URL}/post/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["communityItem", postId],
      });
      setComment("");
    },
  });

  const handlePostComment = () => {
    if (!comment) return;
    if (!localStorage.getItem("user-id") && !userId) {
      setUserId(uuidv4());
    }

    const body = {
      userId: userId as string,
      content: comment,
    };

    postComment.mutate(body);
  };

  return (
    <div className="fixed bottom-0 px-6 pt-2 pb-6 sm:w-layout w-full bg-white border-t border-gray04">
      <div className="relative">
        <input
          type="text"
          className="w-full bg-gray04 rounded-3xl box-shadow-none outline-none border-none py-3 px-4"
          placeholder="댓글을 남겨보세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {comment ? (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handlePostComment}
          >
            <SendIcon color="#009E36" />
          </button>
        ) : (
          <button
            disabled
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <SendIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
