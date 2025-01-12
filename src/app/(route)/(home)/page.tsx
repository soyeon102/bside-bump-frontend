import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import HomeAnimation from "./_components/HomeAnimation";

const HomePage = () => {
  return (
    <div className="flex-1 px-6 flex flex-col justify-between  relative z-10 bg-gradient-to-b from-cyan-100 to-green-200">
      <div className="flex flex-col flex-1 items-center pt-28 gap-8 relative">
        <Logo width={220} height={66} />
        <p className="text-center text-title-sm text-gray02 leading-tight">
          당장의 과소비를 막고 싶은 당신에게 <br />
          추천하는 과소비 방지 서비스
        </p>
        <HomeAnimation />
      </div>
      <Link href="/ask-item" className="mb-2">
        <Button color="home">테스트 시작하기</Button>
      </Link>
      <Link href="/community" className="mb-7">
        <Button color="plain">
          다른 사람 결과 구경가기
          <span className="absolute right-3 -top-1 text-white text-xs bg-warning py-1 px-2 rounded-md">
            NEW
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
