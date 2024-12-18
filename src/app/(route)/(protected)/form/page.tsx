"use client";

import Button from "@/components/Button";
import { useStore } from "@/store/useStore";
import { formatWithCommas } from "@/utils/formatWithCommas";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormPage = () => {
  const router = useRouter();
  const { resultItem } = useStore();

  const [textValue, setTextValue] = useState("");

  console.log(resultItem);

  if (!resultItem) {
    alert("다시 해주세요");
    router.push("/");
    return;
  }

  return (
    <div className="px-6 flex flex-col gap-7">
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
            placeholder="닌텐도 스위치 하나에 이정도나 살 수 있다고....? 먹는게 낫나 스위치
          사는게 낫나.........후 다들 어떻게 생각해...?"
            maxLength={1000}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </form>
        <div className="mt-3">살까말까 투표 기능 사용</div>
        <div className="absolute bottom-1 right-2">
          {textValue.length}/1,000
        </div>
      </div>

      <div>
        <p>투표 기간</p>
      </div>
      <div>
        <p>투표 항목</p>
      </div>

      <Button color="plain">게시하기</Button>
    </div>
  );
};

export default FormPage;
