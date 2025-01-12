import Image from "next/image";
import Link from "next/link";
import AskItemForm from "./_components/AskItemForm.client";
import AskItemButton from "./_components/AskItemButton.client";

const AskItemPage = () => {
  return (
    <>
      <div className="px-6 flex-1 mt-7">
        <div className="mb-11">
          <p className="text-title-lg mb-1">
            소비를 망설이고 있나요?
            <Image
              src="/imgs/emoji-sad.png"
              alt="sad-emoji"
              width={26}
              height={26}
              className="inline-block ml-1 align-text-top"
            />
          </p>
          <p className="text-title-lg">어떤 것인지 적어주세요</p>
        </div>

        <AskItemForm />
      </div>
      <Link href="/ask-condition" className="px-6 mb-7">
        <AskItemButton />
      </Link>
    </>
  );
};

export default AskItemPage;
