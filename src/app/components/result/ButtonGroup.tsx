"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";
import ResetIcon from "@public/icons/reset.svg";

const ButtonGroup = () => {
  const router = useRouter();

  const handleClickShare = () => {};
  const handleClickReset = () => {
    window.location.replace("/ask-item");
  };

  return (
    <div className="flex">
      <Button color="plain" onClick={handleClickShare}>
        공유할래요
      </Button>
      <button
        type="button"
        className={`h-14 py-2.5 px-5 ml-2 rounded-xl border border-black`}
        onClick={handleClickReset}
      >
        <ResetIcon />
      </button>
    </div>
  );
};

export default ButtonGroup;
