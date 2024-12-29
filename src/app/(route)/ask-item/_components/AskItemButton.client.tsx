"use client";

import Button from "@/components/Button";
import { useStore } from "@/store/useStore";

const AskItemButton = () => {
  const { thatItemName, thatItemPrice } = useStore();

  return (
    <Button
      color="plain"
      disable={
        thatItemName === "" ||
        thatItemPrice === 0 ||
        Number(thatItemPrice) < 1000
      }
    >
      다 입력했어요
    </Button>
  );
};

export default AskItemButton;
