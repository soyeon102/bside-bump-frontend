import Link from "next/link";
import Button from "../components/Button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="bg-home bg-contain flex-1 px-6 flex flex-col justify-between">
      <div className="flex flex-col flex-1 items-center mt-14 gap-8">
        <Image
          src="/imgs/logo.png"
          alt="로고"
          width={220}
          height={66}
          style={{ width: "auto" }}
        />
        <p className="text-center text-title-sm text-gray02 leading-tight">
          당장의 과소비를 막고 싶은 당신에게 <br />
          추천하는 과소비 방지 서비스
        </p>
        <Image
          src="/imgs/animation-wallet.gif"
          alt="지갑 애니메이션"
          width={288}
          height={316}
          style={{ height: "auto" }}
          priority
        />
      </div>
      <Link href="/ask-item" className="mb-7">
        <Button color="home">시작할게요</Button>
      </Link>
    </div>
  );
};

export default HomePage;
