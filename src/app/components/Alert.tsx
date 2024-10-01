"use client";

import { useEffect } from "react";
import Button from "./Button";
import Image from "next/image";

const Alert = ({
  isOpen,
  text,
  onClose,
  onClickButton,
}: {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onClickButton: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 px-5 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white max-w-layout-calc rounded-2xl w-full px-6 py-8 flex flex-col items-center`}
      >
        <div className="mb-3">
          <Image
            src="/imgs/emoji-alert.png"
            alt="emoji"
            width={66}
            height={66}
          />
        </div>
        <div className="text-center mb-8 max-w-52 break-keep font-bold text-lg">
          {text}
        </div>
        <Button color="plain" onClick={onClickButton}>
          알겠어요
        </Button>
      </div>
    </div>
  );
};

export default Alert;
