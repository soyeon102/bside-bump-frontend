import Button from "@/app/components/Button";
import ButtonGroup from "@/app/components/result/ButtonGroup";
import ClientItem from "@/app/components/result/ClientItem";
import ResetIcon from "@public/icons/reset.svg";
import Image from "next/image";

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 5000); // 5초 지연
  });
}

const ResultPage = async () => {
  const data = await fetchData();
  console.log("data", data);

  return (
    <div className="px-6 bg-result bg-cover min-h-inherit flex flex-col">
      <div className="w-full h-3 mt-2">
        <Image
          src="/imgs/result-pattern.png"
          alt="패턴"
          width={500}
          height={12}
          className="object-contain"
        />
      </div>
      <div className="bg-white mt-[-1px] flex-1 rounded-b-lg border-b-2 border-dashed border-[#DBEAE0] flex flex-col items-center px-6">
        <ClientItem />
      </div>
      <div className="rounded-t-lg p-4 bg-white mb-6">
        <div className="text-center rounded-lg bg-[#ECF7F9] py-3 mb-5 font-semibold leading-snug text-gray01">
          과소비 방지 리포트가 만들어졌습니다. <br />
          친구에게 공유해 보세요.
        </div>
        <ButtonGroup />
      </div>
    </div>
  );
};

export default ResultPage;
