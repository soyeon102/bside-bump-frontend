import { formatWithCommas } from "@/app/utils/formatWithCommas";
import Image from "next/image";

const Item = ({
  id,
  name,
  price,
  imgSrc,
  selected,
  onClickItem,
}: {
  id: string;
  name: string;
  price: string;
  imgSrc: string;
  selected: boolean;
  onClickItem: () => void;
}) => {
  return (
    <li
      className={`flex flex-col items-center cursor-pointer`}
      value={id}
      onClick={onClickItem}
    >
      <div className="w-full border rounded-lg overflow-hidden min-w-20 min-h-20 mb-2 relative">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover w-full h-auto"
        />
      </div>
      <p className="font-bold">{name}</p>
      <p className="font-semibold text-sm">{formatWithCommas(price)}</p>
    </li>
  );
};

export default Item;
