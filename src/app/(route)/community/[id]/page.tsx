"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { UserIcon, UserIconNoBg, CheckedGreenIcon } from "@/components/icons";
import { useState } from "react";
import CommentListItem from "../_components/CommentListItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/constants/url.const";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useUserIdStore } from "@/store/useStore";
import Loading from "@/app/loading";
import { formatWithCommas } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import CommentInput from "../_components/CommentInput";

type Condition = "MORE" | "EXPENSIVE";

interface RecommendedItemType {
  name: string;
  price: number;
  iconUrl: string;
  percentage: number;
  quantity: number;
  change: number;
}

interface DataType {
  id: string;
  name: string;
  price: number;
  recommendationType: Condition;
  suggestedItems: RecommendedItemType[];
}

interface CommentLikesType {
  userId: string;
}

interface CommunityDataType {
  id: string;
  description: string;
  createdAt: string;
  comments?: {
    id: string;
    content: string;
    createdAt: string;
    postId: string;
    userId: string;
    commentLikes: CommentLikesType[];
  }[];
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
  resultId: string;
  userId: string;
  result: DataType;
}

const CommunityDetailPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  const userId = useUserIdStore((state) => state.userId);
  const setUserId = useUserIdStore((state) => state.setUserId);
  const queryClient = useQueryClient();

  const [voteItem, setVoteItem] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<CommunityDataType>({
    queryKey: ["communityItem", params.id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/post/${params.id}`);
      return res.json();
    },
  });

  const postVote = useMutation({
    mutationKey: ["postVote"],
    mutationFn: async (body: { userId: string; option: string }) => {
      const res = await fetch(`${API_URL}/post/${params.id}/poll`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["communityItem", params.id],
      });
    },
  });

  const handleClickVoteItem = (option: string) => {
    setVoteItem(option);
  };

  const handleClickVote = async () => {
    if (!voteItem) return;
    if (!localStorage.getItem("user-id") && !userId) {
      setUserId(uuidv4());
    }

    const body = {
      userId: userId as string,
      option: voteItem,
    };

    postVote.mutate(body);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data || isError) {
    return (
      <>
        <Header hasBack onClickBack={() => router.back()} title="" />
        <div className="flex-1 flex justify-center items-center">
          존재하지 않는 게시글입니다.
        </div>
      </>
    );
  }

  const isVoted = data.polls?.some((item) => item.userId === userId);

  return (
    <>
      <Header hasBack onClickBack={() => router.back()} title="" />
      <div className="overflow-y-auto pb-20">
        <div className="py-7 px-6 flex flex-col gap-6 p-6">
          <div className="flex items-center gap-2">
            <UserIcon />
            <p className="font-bold text-gray01">익명</p>
            <p className="text-gray02 text-xs bg-gray04 rounded-md text-center px-1 py-[2px]">
              {formatRelativeTime(data?.createdAt || "")}
            </p>
          </div>
          <div className="w-full border-l-2 py-2 px-4 border-primary04 flex flex-col gap-2 bg-primary01 bg-opacity-10">
            <p className="text-gray02 font-bold text-sm">
              {data.result.name} {formatWithCommas(data.result.price)}원,
              그돈이면{" "}
              {data.result.recommendationType === "MORE" ? "차라리" : "아껴서"}
            </p>
            <p className="text-primary04 text-sm font-bold">
              {data.result.recommendationType === "MORE"
                ? data.result.suggestedItems
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(" 또는 ")
                : `${data.result.suggestedItems[0].name} ${data.result.suggestedItems[0].percentage}%`}
            </p>
          </div>
          {data.description && (
            <div
              className={`text-gray01 min-h-24 max-h-textbox whitespace-pre-wrap overflow-y-auto`}
            >
              {data.description}
            </div>
          )}
          {/* 투표 영역 */}
          {Array.isArray(data.pollItems) && data.pollItems.length > 0 && (
            <div className="p-4 rounded-2xl border-gray03 border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray01 font-bold">진행중인 투표</p>
                <p className="flex items-center gap-1">
                  <UserIconNoBg />
                  <span className="text-gray05 text-sm font-bold">
                    {data.polls?.length || 0}명 참여
                  </span>
                </p>
              </div>
              {!isVoted ? (
                <>
                  <ul className="flex flex-col gap-2">
                    {data.pollItems.map((pollItem, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleClickVoteItem(pollItem.option || "")
                        }
                        className={`w-full max-h-11 flex items-center gap-2 text-sm cursor-pointer bg-gray03 border-gray03 border-opacity-10 border bg-opacity-10 rounded-lg p-3 ${
                          voteItem === pollItem.option
                            ? "bg-primary03 border-primary04 border border-opacity-100"
                            : ""
                        }`}
                      >
                        {voteItem === pollItem.option ? (
                          <CheckedGreenIcon />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-gray03"></span>
                        )}
                        <p className="">{pollItem.option}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-3 w-full text-sm rounded-lg p-3 font-bold bg-primary03 text-black disabled:bg-gray03 disabled:text-white hover:opacity-90"
                    disabled={voteItem === null}
                    onClick={() => handleClickVote()}
                  >
                    투표하기
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  {data.pollItems?.map((pollItem, index) => {
                    const votePercentage =
                      ((data.optionCounts?.[pollItem.option] || 0) /
                        (Object.values(data.optionCounts || {}).reduce(
                          (acc, cur) => acc + cur,
                          0
                        ) || 1)) *
                      100;

                    const isHighest =
                      Math.max(...Object.values(data.optionCounts || {})) ===
                      (data.optionCounts?.[pollItem.option] || 0);

                    return (
                      <div
                        key={index}
                        className={`w-full overflow-hidden text-sm rounded-lg relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[var(--vote-width)] after:h-full after:rounded-lg ${
                          isHighest
                            ? "bg-primary01 bg-opacity-10 after:bg-primary03"
                            : "bg-gray03 bg-opacity-10 after:bg-gray03"
                        } p-3 text-gray01 flex items-center justify-between`}
                        style={{
                          ["--vote-width" as string]: `${votePercentage}%`,
                        }}
                      >
                        <p className="text-gray01 relative z-10">
                          {pollItem.option}
                        </p>
                        <p className="text-gray02 text-opacity-50 relative z-10 font-bold">
                          {Math.round(votePercentage)}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="text-sm">
            댓글 <span className="font-bold">{data.comments?.length || 0}</span>
          </div>
        </div>
        <hr className="border-gray04 border-b-4" />
        <div className="py-7 px-6 flex flex-col gap-7">
          {data.comments?.map((comment) => (
            <CommentListItem
              key={comment.id}
              commentId={comment.id}
              boardId={comment.postId}
              comment={comment.content}
              createdAt={comment.createdAt}
              commentLikes={comment.commentLikes}
            />
          ))}
        </div>
      </div>
      <CommentInput postId={params.id} />
    </>
  );
};

export default CommunityDetailPage;
