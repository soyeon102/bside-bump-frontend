"use client";

import React, { ChangeEvent } from "react";
import usePriceChange from "@/hooks/usePriceChange";
import { useStore } from "@/store/useStore";
import { formatWithCommas } from "@/utils";
import { TextField } from "@/components/TextField";

const AskItemForm = () => {
  const { thatItemName, thatItemPrice, setThatItemName, setThatItemPrice } =
    useStore();

  const { handlePriceChange } = usePriceChange(thatItemPrice, setThatItemPrice);

  return (
    <>
      <div className="mb-12">
        <TextField
          placeholder="오마카세"
          type="text"
          value={thatItemName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setThatItemName(e.currentTarget.value)
          }
          maxLength={20}
          labelText="소비를 망설이고 있는 것"
        />
      </div>
      <div>
        <TextField
          placeholder="1,000"
          type="text"
          value={thatItemPrice ? formatWithCommas(thatItemPrice) : ""}
          onChange={handlePriceChange}
          pattern="\d*"
          maxLength={9}
          labelText="가격"
          unitText="원"
          helperText="*1,000원 이상 입력해 주세요"
        />
      </div>
    </>
  );
};

export default AskItemForm;
