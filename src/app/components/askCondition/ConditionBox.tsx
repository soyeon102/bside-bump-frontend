import Image from "next/image";
import RightArrow from "@public/icons/chevron-right.svg";

const ConditionBox = ({
  topic,
  text,
  imgSrc,
}: {
  topic: string;
  text: string;
  imgSrc: string;
}) => {
  return (
    <div className="bg-gray04 px-3 py-5 rounded-2xl flex items-center">
      <Image src={imgSrc} alt={topic} width={60} height={60} />
      <div className="flex-1 mx-3">
        <p className="text-sm text-gray02 mb-2">{topic}</p>
        <p className="text-lg text-gray01 font-bold leading-tight break-keep">
          {text}
        </p>
      </div>
      <RightArrow />
    </div>
  );
};

export default ConditionBox;
