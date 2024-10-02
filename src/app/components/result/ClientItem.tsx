"use client";

import { useStore } from "@/app/store/useStore";
import { formatWithCommas } from "@/app/utils/formatWithCommas";

const ClientItem = () => {
  const { thatItemName, thatItemPrice, selectCondition } = useStore();

  return (
    <>
      <p className="text-gray03 font-extrabold text-sm my-3">[결과지]</p>
      <p className="text-title-lg mb-1">
        {thatItemName} {formatWithCommas(thatItemPrice)}원,
      </p>

      <p className="w-fit text-title-lg shadow-[inset_0_-12px_0_rgba(152,255,187,1)]">
        {selectCondition === "MORE"
          ? "그 돈이면 이만큼 살 수 있어요!"
          : "그 돈이면 이만큼이나 모아요!"}
      </p>
    </>
  );
};

export default ClientItem;
