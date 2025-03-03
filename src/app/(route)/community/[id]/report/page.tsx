"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button";
import Header from "@/components/Header";
import { RadioIcon } from "@/components/icons";

const reasonList = [
  { id: 1, text: "본문과 관련 없는 내용" },
  { id: 2, text: "욕설, 비방, 음란 내용" },
  { id: 3, text: "광고 등 상업적 홍보" },
  { id: 4, text: "개인정보 유출" },
  { id: 5, text: "기타" },
];

const ReportPage = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const commentId = searchParams.get("commentId");

  const [selectedReason, setSelectedReason] = useState<number>(1);
  const [etcReason, setEtcReason] = useState<string>("");

  return (
    <>
      <Header hasBack onClickBack={() => router.back()} title="신고하기" />
      <div className="px-6 pb-5 flex flex-col justify-between flex-1">
        <div className="mt-7">
          <p className="text-gray01 font-bold mb-3">신고 사유</p>
          <ul className="flex flex-col gap-2 mb-3">
            {reasonList.map((reason) => (
              <li key={reason.id}>
                <button
                  onClick={() => setSelectedReason(reason.id)}
                  className="flex items-center gap-3"
                >
                  {selectedReason === reason.id ? (
                    <RadioIcon className="flex-shrink-0" />
                  ) : (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-gray03"></span>
                  )}
                  <p className="text-gray-01 text-sm text-left">
                    {reason.text}
                  </p>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative">
            <textarea
              value={etcReason}
              onChange={(e) => setEtcReason(e.target.value)}
              className="w-full h-textbox text-sm bg-gray04 rounded-lg p-4 h-textBox resize-none focus:outline-none text-gray01"
              placeholder="1,000자 이내로 신고 내용을 입력해주세요"
              maxLength={1000}
              disabled={selectedReason !== 5}
            />
            <div className="absolute -bottom-6 right-2 text-sm">
              {etcReason.length.toLocaleString()}/1,000
            </div>
          </div>
        </div>
        <div>
          <Button color="plain">신고하기</Button>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
