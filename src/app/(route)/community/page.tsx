"use client";

import UserIcon from "@/components/icons/UserIcon";
import { useState } from "react";

const CommunityPage = () => {
  const [isOngoing, setIsOngoing] = useState(false);

  const handleClickToggle = () => setIsOngoing(!isOngoing);

  return (
    <div className="mt-2 px-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm">게시글 1,234개</p>
          <p>최신순</p>
        </div>
        <div className="flex items-center justify-end mr-1">
          <p className="text-sm text-gray02 mr-1">진행중인 투표만 보기</p>
          <div
            className="w-7 h-4 rounded-half p-[2px] bg-gray03 cursor-pointer"
            onClick={handleClickToggle}
          >
            <span className="block w-3 h-3 rounded-full bg-white"></span>
          </div>
        </div>
      </div>
      <ul className="mt-6">
        <li className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <UserIcon />
            <p className="font-bold text-gray01">익명 245474</p>
            <p className="text-gray02 text-xs bg-gray04 rounded-md text-center px-1 py-[2px]">
              10분 전
            </p>
          </div>
          <div className="w-full border-l-2 py-2 px-4 border-primary04 flex flex-col gap-2 bg-primary01 bg-opacity-10">
            <p className="text-gray02 font-bold text-sm">
              닌텐도 스위치 350,000원 그 돈이면
            </p>
            <p className="text-primary04 text-sm">
              햄버거 x 40 (남은 돈 500원) 혹은 닭강정 x 17 (남은 돈 10,000원)
            </p>
          </div>
          <div className="text-gray01">
            닌텐도 스위치 하나에 이정도나 살 수 있다고....?
            <br />
            먹는게 낫나 스위치 사는게 낫나.........후
            <br />
            다들 어떻게 생각해...?
            <br />
          </div>
          <div className="p-4 rounded-2xl border-gray03 border p">
            <div className="flex items-center justify-between mb-3">
              <p className="">투표결과: 참는다</p>
              <p>9,123명 참여</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg bg-primary01 bg-opacity-10 relative after:contetn-[''] after:absolute after:top-0 after:left-0 after:w-2/3 after:h-full after:rounded-lg after:bg-primary03 p-4 text-gray01 flex items-center justify-between">
              <p className="text-gray01 relative z-10">참는다</p>
              <p className="text-gray02 text-opacity-20 relative z-10">78%</p>
            </div>
            <div className="mt-2 overflow-hidden rounded-lg w-full bg-gray03 bg-opacity-10 relative after:contetn-[''] after:absolute after:top-0 after:left-0 after:w-2/3 after:h-full after:rounded-lg after:bg-gray03 p-4 text-gray01 flex items-center justify-between">
              <p className="text-gray01 relative z-10">지른다</p>
              <p className="text-gray02 text-opacity-20 relative z-10">78%</p>
            </div>
          </div>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default CommunityPage;
