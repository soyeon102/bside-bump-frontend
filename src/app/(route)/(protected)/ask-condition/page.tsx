"use client";

import ConditionBox from "@/components/askCondition/ConditionBox";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";

const AskConditionPage = () => {
  const { thatItemName, thatItemPrice, setSelectCondition } = useStore();

  return (
    <div className="px-6">
      <p className="text-title-lg mb-1">
        {thatItemName} {Number(thatItemPrice).toLocaleString()}원이요?
        <Image
          src="/imgs/emoji-surprise.png"
          alt="surprise-emoji"
          width={26}
          height={26}
          className="inline-block ml-1 align-text-top"
        />
      </p>
      <p className="text-title-lg">제 생각에는...</p>
      <div className="flex flex-col gap-3 mt-16">
        <Link href="/select" onClick={() => setSelectCondition("MORE")}>
          <ConditionBox
            topic="그 돈이면 차라리"
            text="같은 돈으로 할 수 있는
더 많은 것들을 골라봐요"
            imgSrc="/imgs/coin.png"
          />
        </Link>
        <Link href="/select" onClick={() => setSelectCondition("EXPENSIVE")}>
          <ConditionBox
            topic="그 돈이면 아껴서"
            text="이걸로 할 수 있는 금액의
N%를 벌써 모은 거예요"
            imgSrc="/imgs/percentage.png"
          />
        </Link>
      </div>
    </div>
  );
};

export default AskConditionPage;
