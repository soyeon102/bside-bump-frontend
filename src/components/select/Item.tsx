import { formatWithCommas } from "@/utils/formatWithCommas";
import Image from "next/image";
import { CheckedIcon } from "../icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Item = ({
  id,
  name,
  price,
  iconUrl,
  selected,
  onClickItem,
}: {
  id: number;
  name: string;
  price: string;
  iconUrl: string | undefined;
  selected: boolean;
  onClickItem: () => void;
}) => {
  return (
    <li
      className={`flex flex-col items-center cursor-pointer`}
      value={id}
      onClick={onClickItem}
    >
      <div
        className={`w-full border rounded-lg overflow-hidden min-w-20 min-h-20 mb-2 relative `}
      >
        <Image
          src={`${API_URL}/public/images/icons/${iconUrl}`}
          alt={name}
          fill
          sizes="100px"
          className={`object-cover w-full h-auto ${
            selected && "brightness-50"
          }`}
        />
        {selected && (
          <div className="absolute top-1 right-1">
            <CheckedIcon />
          </div>
        )}
      </div>
      <p className="font-bold text-center break-keep">{name}</p>
      <p className="font-semibold text-sm">{formatWithCommas(price)}</p>
    </li>
  );
};

export default Item;
