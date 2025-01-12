"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { UserIcon, UserIconNoBg, CheckedGreenIcon } from "@/components/icons";
import { useState } from "react";
import CommentListItem from "../_components/CommentListItem";

type VoteType = "BUY" | "HOLD" | null;

const CommunityDetailPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  console.log(params.id);

  const [voteType, setVoteType] = useState<VoteType>(null);

  console.log("voteType", voteType);

  return (
    <>
      <Header hasBack onClickBack={() => router.back()} title="" />
      <div className="overflow-y-auto pb-16">
        <div className="py-7 px-6 flex flex-col gap-6 p-6">
          <div className="flex items-center gap-2">
            <UserIcon />
            <p className="font-bold text-gray01">김철수</p>
            <p className="text-gray02 text-xs bg-gray04 rounded-md text-center px-1 py-[2px]">
              10분 전
            </p>
          </div>
          <div className="w-full border-l-2 py-2 px-4 border-primary04 flex flex-col gap-2 bg-primary01 bg-opacity-10">
            <p className="text-gray02 font-bold text-sm">
              닌텐도 스위치 350,000원 그 돈이면
            </p>
            <p className="text-primary04 text-sm font-bold">
              햄버거 x 40 (남은 돈 500원) 혹은 닭강정 x 17 (남은 돈 10,000원)
            </p>
          </div>
          <div className={`text-gray01 max-h-textbox`}>
            닌텐도 스위치 하나에 이정도나 살 수 있다고....?
            <br />
            먹는게 낫나 스위치 사는게 낫나.........후
            <br />
            다들 어떻게 생각해...?
            <br />
          </div>
          <div className="p-4 rounded-2xl border-gray03 border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray01 font-bold">진행중인 투표</p>
              <p className="flex items-center gap-1">
                <UserIconNoBg />
                <span className="text-gray05 text-sm font-bold">
                  9,123명 참여
                </span>
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              <li
                className={`w-full flex items-center gap-2 cursor-pointer bg-gray03 border-gray03 border-opacity-10 border bg-opacity-10 rounded-lg p-3 ${
                  voteType === "BUY"
                    ? "bg-primary03 border-primary04 border border-opacity-100"
                    : ""
                }`}
                onClick={() =>
                  voteType !== "BUY" ? setVoteType("BUY") : setVoteType(null)
                }
              >
                {voteType === "BUY" ? (
                  <CheckedGreenIcon />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-gray03"></span>
                )}

                <p className="">참는다</p>
              </li>
              <li
                className={`w-full flex items-center gap-2 cursor-pointer bg-gray03 border-gray03 border-opacity-10 border bg-opacity-10 rounded-lg p-3 ${
                  voteType === "HOLD"
                    ? "bg-primary03 border-primary04 border border-opacity-100"
                    : ""
                }`}
                onClick={() =>
                  voteType !== "HOLD" ? setVoteType("HOLD") : setVoteType(null)
                }
              >
                {voteType === "HOLD" ? (
                  <CheckedGreenIcon />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-gray03"></span>
                )}

                <p className="">지른다</p>
              </li>
            </ul>
            <button
              className="mt-3 w-full rounded-lg p-3 font-bold bg-primary03 text-black disabled:bg-gray03 disabled:text-white hover:opacity-90"
              disabled={voteType === null}
            >
              투표하기
            </button>
          </div>
          <div className="text-sm">
            댓글 <span className="font-bold">4</span>
          </div>
        </div>
        <hr className="border-gray04 border-b-4" />
        <div className="py-7 px-6 flex flex-col gap-3">
          <CommentListItem comment="아니 돈아깝게 그걸 산다고? 미쳤어???" />
          <CommentListItem comment="난 사도 괜찮을 거 같은데? 두달만 라면만 먹으면 되지 ㅋㅋㅋㅋㅋ..ㅎㅎ" />
        </div>
      </div>
      <div className="fixed bottom-0 px-6 py-2 w-layout bg-white border-t border-gray04">
        <input
          type="text"
          className="w-full bg-gray04 rounded-3xl box-shadow-none outline-none border-none py-3 px-4"
          placeholder="댓글을 남겨보세요"
        />
      </div>
    </>
  );
};

export default CommunityDetailPage;
