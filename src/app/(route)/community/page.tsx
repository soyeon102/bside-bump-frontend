"use client";

import { ChevronUpIcon, ChevronDownIcon } from "@/components/icons";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/url.const";
import Loading from "@/app/loading";
import ListItem from "./_components/ListItem";

type Condition = "MORE" | "EXPENSIVE";

interface RecommendedItemType {
  name: string;
  price: number;
  iconUrl: string;
  percentage: number;
  quantity: number;
  change: number;
}

interface DataType {
  id: string;
  name: string;
  price: number;
  recommendationType: Condition;
  suggestedItems: RecommendedItemType[];
}

interface CommunityDataType {
  id: string;
  description: string;
  createdAt: string;
  comments?: {
    id: string;
    content: string;
    createdAt: string;
    postId: string;
    userId: string;
  }[];
  optionCounts?: Record<string, number>;
  pollItems?: Array<{ option: string }>;
  pollEndAt?: string;
  polls?: {
    createdAt: string;
    id: string;
    option: string;
    postId: string;
    updatedAt: string;
    userId: string;
  }[];
  resultId: string;
  userId: string;
  result: DataType;
}

const filterList = [
  {
    id: 0,
    sort: "최신순",
    value: "desc",
  },
  {
    id: 1,
    sort: "오래된순",
    value: "asc",
  },
];

const CommunityPage = () => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState("desc");

  const { data, isLoading, error } = useQuery<CommunityDataType[]>({
    queryKey: ["communityList", filterValue, isOngoing],
    queryFn: async () => {
      const params = new URLSearchParams({
        order: filterValue,
        limit: "1000",
        status: isOngoing ? "progress" : "",
      });

      const res = await fetch(`${API_URL}/post?${params}`);
      return res.json() as Promise<CommunityDataType[]>;
    },
  });

  const handleClickToggle = () => setIsOngoing(!isOngoing);

  const handleClickFilterItem = (val: string) => {
    setFilterValue(val);
    setIsFilterModal(false);
  };

  if (error) {
    return (
      <div className="h-full flex-1 flex justify-center items-center">
        <p className="text-lg">게시글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div className="h-full flex-1 flex justify-center items-center">
        <p className="text-lg">게시글이 없습니다.</p>
      </div>
    );
  }

  console.log("data", data);

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2 px-6">
        <div className="flex justify-between relative">
          <p className="text-sm">게시글 {data.length}개</p>
          <p
            className="flex gap-1 items-center cursor-pointer text-sm"
            onClick={() => setIsFilterModal(!isFilterModal)}
          >
            {filterList.find((item) => item.value === filterValue)?.sort}{" "}
            {isFilterModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </p>
          {isFilterModal && (
            <ul className="absolute right-0 top-6 z-20 shadow-[1px_2px_6px_0_rgba(0,0,0,0.15)] bg-white rounded-lg overflow-hidden">
              {filterList.map((el) => (
                <li
                  key={el.value}
                  className={`py-2 px-4 font-semibold text-sm [&:not(:last-child)]:border-b cursor-pointer hover:bg-gray04 ${
                    filterValue === el.value ? "text-primary04" : "text-gray01"
                  }`}
                  onClick={() => handleClickFilterItem(el.value)}
                >
                  {el.sort}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-end mr-1">
          <p className="text-sm text-gray02 mr-1">진행중인 투표만 보기</p>
          <div
            className={`w-7 h-4 rounded-half p-[2px] bg-gray03 cursor-pointer ${
              isOngoing ? "bg-primary03" : ""
            }`}
            onClick={handleClickToggle}
          >
            <span
              className={`block w-3 h-3 rounded-full bg-white transition-all ${
                isOngoing ? "translate-x-3" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>
      <ul className="bg-gray04 flex flex-col gap-y-3 pb-3">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem item={item} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default CommunityPage;
