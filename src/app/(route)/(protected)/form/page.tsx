"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { useStore } from "@/store/useStore";
import { formatDate, formatWithCommas } from "@/utils";
import { CheckedBlackIcon, RadioIcon } from "@/components/icons";

const today = new Date();

const radioButtons = [
  {
    label: "1일",
    value: 1,
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    ),
  },
  {
    label: "2일",
    value: 2,
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
    ),
  },
  {
    label: "일주일",
    value: 7,
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    ),
  },
];

const FormPage = () => {
  const router = useRouter();
  const { resultItem } = useStore();

  const [textValue, setTextValue] = useState("");
  const [isVote, setIsVote] = useState(false);
  const [selectPeriod, setSelectPeriod] = useState(1);
  const [selectType, setSelectType] = useState(0);

  if (!resultItem) {
    alert("다시 해주세요");
    router.push("/");
    return;
  }

  return (
    <div className="px-6 flex flex-col justify-between flex-1">
      <div className="flex flex-col gap-7">
        <div>
          <h6 className="text-title-lg mt-7">
            {resultItem.name} {formatWithCommas(resultItem.price.toString())}원
          </h6>
          <h6 className="text-title-sm mt-1">
            {resultItem?.recommendationType === "MORE"
              ? "그 돈이면 이런 걸 살 수 있어요!"
              : "그 돈이면 이만큼 모을 수 있어요!"}
          </h6>
          <p className="mt-4 border-l-2 py-2 px-4 border-primary04 text-primary04 text-sm font-bold bg-primary01 bg-opacity-10 w-full">
            {resultItem.recommendationType === "MORE"
              ? resultItem.suggestedItems
                  .map((item) => `${item.name} x ${item.quantity}`)
                  .join(" 또는 ")
              : `${resultItem.suggestedItems[0].name} ${resultItem.suggestedItems[0].percentage}%`}
          </p>
        </div>
        <div className="relative">
          <form action="">
            <textarea
              className="w-full bg-gray04 rounded-xl p-4 h-[240px] resize-none focus:outline-none text-gray01 text-sm"
              placeholder={`닌텐도 스위치 하나에 이정도나 살 수 있다고....? 먹는게 낫나 스위치 사는게 낫나.........후\n다들 어떻게 생각해...?`}
              maxLength={1000}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </form>
          <button
            className="mt-3 flex items-center gap-2 cursor-pointer"
            onClick={() => setIsVote(!isVote)}
          >
            {isVote ? (
              <CheckedBlackIcon />
            ) : (
              <span className="w-5 h-5 rounded-full border border-gray03"></span>
            )}
            <p className="text-sm">살까말까 투표 기능 사용</p>
          </button>
          <div className="absolute bottom-1 right-2 text-sm">
            {textValue.length.toLocaleString()}/1,000
          </div>
        </div>
        {isVote && (
          <>
            <div>
              <p className="pb-3 border-b text-sm font-semibold">투표 기간</p>
              <ul className="flex flex-col gap-3 mt-3">
                {radioButtons.map((button, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setSelectPeriod(button.value)}
                    >
                      {selectPeriod === button.value ? (
                        <RadioIcon />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-gray03"></span>
                      )}
                      <p className="text-sm">{button.label}</p>
                    </div>
                    <p className="text-xs text-gray02">종료일: {button.date}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pb-8">
              <p className="pb-3 border-b text-sm font-semibold">투표 항목</p>
              <ul className="flex flex-col gap-3 mt-3">
                <li
                  className="flex items-center gap-3 w-fit cursor-pointer"
                  onClick={() => setSelectType(0)}
                >
                  {selectType === 0 ? (
                    <RadioIcon />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray03"></span>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    <div className="flex gap-1 items-center">
                      <p className="text-primary04 bg-primary04 bg-opacity-10 rounded-md px-1 text-xs">
                        항목1
                      </p>
                      <p className="text-sm">참는다</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="text-primary04 bg-primary04 bg-opacity-10 rounded-md px-1 text-xs">
                        항목2
                      </p>
                      <p className="text-sm">지른다</p>
                    </div>
                  </div>
                </li>
                <li
                  className="flex items-center gap-3 w-fit cursor-pointer"
                  onClick={() => setSelectType(1)}
                >
                  {selectType === 1 ? (
                    <RadioIcon />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray03"></span>
                  )}
                  <p className="text-sm">직접 입력</p>
                </li>
                {selectType === 1 && (
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      className="w-full border rounded-md p-2 border-b-[#e5e7eb] text-sm"
                      placeholder="항목1"
                      maxLength={20}
                    />
                    <input
                      type="text"
                      className="w-full border rounded-md p-2 border-b-[#e5e7eb] text-sm"
                      placeholder="항목2"
                      maxLength={20}
                    />
                  </div>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="mb-7">
        <Button color="plain" onClick={() => alert("서비스 준비중입니다.")}>
          게시하기
        </Button>
      </div>
    </div>
  );
};

export default FormPage;
