"use client";

import Button from "@/app/components/Button";
import { useStore } from "@/app/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { formatWithCommas } from "@/app/utils/formatWithCommas";
import usePriceChange from "@/app/hooks/usePriceChange";

const AskItemPage = () => {
  const { thatItemName, thatItemPrice, setThatItemName, setThatItemPrice } =
    useStore();

  const { handlePriceChange } = usePriceChange(thatItemPrice, setThatItemPrice);

  return (
    <>
      <div className="px-6 flex-1">
        <div className="mb-11">
          <p className="text-title-lg flex items-center mb-1">
            소비를 망설이고 있나요?
            <Image
              src="/imgs/emoji-sad.png"
              alt="sad-emoji"
              width={26}
              height={26}
              className="inline-block ml-1"
            />
          </p>
          <p className="text-title-lg">어떤 것인지 적어주세요</p>
        </div>
        <div className="mb-12">
          <p className="mb-3">소비를 망설이고 있는 것</p>
          <input
            placeholder="오마카세"
            type="text"
            value={thatItemName}
            className="font-bold text-lg py-3 w-full placeholder:text-lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setThatItemName(e.currentTarget.value)
            }
            maxLength={20}
          />
        </div>
        <div>
          <p className="mb-3">가격</p>
          <div className="flex items-center">
            <input
              placeholder="1,000"
              className="font-bold text-lg py-3 pr-1 mr-2 flex-1 placeholder:text-lg"
              type="text"
              value={thatItemPrice ? formatWithCommas(thatItemPrice) : ""}
              onChange={handlePriceChange}
              pattern="\d*"
              maxLength={9}
            />
            <span className="font-bold text-lg">원</span>
          </div>
          <span className="text-gray02 text-sm">
            *1,000원 이상 입력해 주세요
          </span>
        </div>
      </div>
      <Link href="/ask-condition" className="px-6 mb-7">
        <Button
          color="plain"
          disable={
            thatItemName === "" ||
            thatItemPrice === "" ||
            Number(thatItemPrice) < 1000
          }
        >
          다 입력했어요
        </Button>
      </Link>
    </>
  );
};

export default AskItemPage;
