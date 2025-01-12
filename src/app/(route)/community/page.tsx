"use client";

import { ChevronUpIcon, ChevronDownIcon } from "@/components/icons";

import { useState } from "react";
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

interface CommunityDataType extends DataType {
  user: string;
  date: Date;
  voteData: {
    buy: number;
    hold: number;
    voteCount: number;
  };
  comments: number;
}

const mockData: CommunityDataType[] = [
  {
    id: "0",
    user: "김철수",
    date: new Date("2024-12-25"),
    recommendationType: "MORE",
    name: "오마카세",
    price: 80000,
    suggestedItems: [
      {
        name: "삼성전자",
        price: 80000,
        iconUrl: "https://dummyimage.com/600x400/000/fff",
        percentage: 0.5,
        quantity: 1,
        change: 0.5,
      },
    ],
    voteData: {
      buy: 123,
      hold: 12,
      voteCount: 143,
    },
    comments: 12,
  },
  {
    id: "1",
    user: "김철수",
    date: new Date("2024-12-25"),
    recommendationType: "MORE",
    name: "오마카세",
    price: 80000,
    suggestedItems: [
      {
        name: "삼성전자",
        price: 80000,
        iconUrl: "https://dummyimage.com/600x400/000/fff",
        percentage: 0.5,
        quantity: 1,
        change: 0.5,
      },
    ],
    voteData: {
      buy: 123,
      hold: 12,
      voteCount: 143,
    },
    comments: 12,
  },
];

const filterList = [
  {
    id: 0,
    sort: "최신순",
  },
  {
    id: 1,
    sort: "오래된순",
  },
];

const CommunityPage = () => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [filterId, setFilterId] = useState(0);

  const handleClickToggle = () => setIsOngoing(!isOngoing);

  const handleClickFilterItem = (id: number) => {
    setFilterId(id);
    setIsFilterModal(false);
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2 px-6">
        <div className="flex justify-between relative">
          <p className="text-sm">게시글 1,234개</p>
          <p
            className="flex gap-1 items-center cursor-pointer text-sm"
            onClick={() => setIsFilterModal(!isFilterModal)}
          >
            {filterList.find((item) => item.id === filterId)?.sort}{" "}
            {isFilterModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </p>
          {isFilterModal && (
            <ul className="absolute right-0 top-6 z-20 shadow-[1px_2px_6px_0_rgba(0,0,0,0.15)] bg-white rounded-lg overflow-hidden">
              {filterList.map((el) => (
                <li
                  key={el.id}
                  className={`py-2 px-4 font-semibold text-sm [&:not(:last-child)]:border-b cursor-pointer hover:bg-gray04 ${
                    filterId === el.id ? "text-primary04" : "text-gray01"
                  }`}
                  onClick={() => handleClickFilterItem(el.id)}
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
        {mockData.map((data) => (
          <ListItem key={data.id} item={data} />
        ))}

        {/* <ListItem />
        <ListItem />
        <ListItem /> */}
      </ul>
    </div>
  );
};

export default CommunityPage;
