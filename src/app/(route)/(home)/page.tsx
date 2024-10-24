import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import HomeAnimation from "./_components/HomeAnimation";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex-1 px-6 flex flex-col justify-between  relative z-10">
      <div className="flex flex-col flex-1 items-center mt-14 gap-8">
        <Logo width={220} height={66} />
        <p className="text-center text-title-sm text-gray02 leading-tight">
          당장의 과소비를 막고 싶은 당신에게 <br />
          추천하는 과소비 방지 서비스
        </p>
        <HomeAnimation />
      </div>
      <Link href="/ask-item" className="mb-7">
        <Button color="home">시작할게요</Button>
      </Link>

      <Image
        src={"/imgs/home-background.png"}
        alt="홈 배경화면"
        fill
        className="-z-10 object-cover"
      />
    </div>
  );
};

export default HomePage;
