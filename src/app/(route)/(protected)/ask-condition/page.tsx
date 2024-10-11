import Link from "next/link";
import AskConditionText from "./_components/AskConditionText.client";
import AskConditionBox from "./_components/AskConditionBox.client";

const AskConditionPage = () => {
  return (
    <div className="px-6">
      <AskConditionText />
      <div className="flex flex-col gap-3 mt-16">
        <Link href="/select">
          <AskConditionBox
            topic="그 돈이면 차라리"
            text="같은 돈으로 할 수 있는
더 많은 것들을 골라봐요"
            imgSrc="/imgs/coin.png"
            conditionType="MORE"
          />
        </Link>
        <Link href="/select">
          <AskConditionBox
            topic="그 돈이면 아껴서"
            text="이걸로 할 수 있는 금액의
N%를 벌써 모은 거예요"
            imgSrc="/imgs/percentage.png"
            conditionType="EXPENSIVE"
          />
        </Link>
      </div>
    </div>
  );
};

export default AskConditionPage;
