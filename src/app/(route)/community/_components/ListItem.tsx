import { UserIcon, UserIconNoBg } from "@/components/icons";
import { formatWithCommas } from "@/utils";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import Link from "next/link";

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

const ListItem = ({ item }: { item: CommunityDataType }) => {
  return (
    <li>
      <Link
        href={`/community/${item.id}`}
        className="bg-white flex flex-col gap-6 p-6"
      >
        <div className="flex items-center gap-2">
          <UserIcon />
          <p className="font-bold text-gray01">익명</p>
          <p className="text-gray02 text-xs bg-gray04 rounded-md text-center px-1 py-[2px]">
            {formatRelativeTime(item.createdAt)}
          </p>
        </div>
        <div className="w-full border-l-2 py-2 px-4 border-primary04 flex flex-col gap-2 bg-primary01 bg-opacity-10">
          {item.result && (
            <>
              <p className="text-gray02 font-bold text-sm break-keep">{`${
                item.result.name
              } ${formatWithCommas(item.result.price)}원, 그돈이면 ${
                item.result.recommendationType === "MORE" ? "차라리" : "아껴서"
              }`}</p>
              <p className="text-primary04 text-sm font-bold break-keep">
                {item.result.recommendationType === "MORE"
                  ? item.result.suggestedItems
                      ?.map((item) => `${item.name} x ${item.quantity}`)
                      .join(" 또는 ")
                  : item.result.suggestedItems?.[0] &&
                    `${item.result.suggestedItems[0].name} ${item.result.suggestedItems[0].percentage}%`}
              </p>
            </>
          )}
        </div>
        <div
          className={`text-gray01 min-h-24 max-h-textbox whitespace-pre-wrap text-ellipsis overflow-hidden line-clamp-4`}
        >
          {item.description}
        </div>
        {Array.isArray(item?.pollItems) && item.pollItems.length > 0 && (
          <div className="p-4 rounded-2xl border-gray03 border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray01 font-bold">진행중인 투표</p>
              <p className="flex items-center gap-1">
                <UserIconNoBg />
                <span className="text-gray05 text-sm font-bold">
                  {Object.values(item.optionCounts || {}).reduce(
                    (acc, cur) => acc + cur,
                    0
                  )}
                  명 참여
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {item.pollItems?.map((pollItem, index) => {
                const votePercentage =
                  ((item.optionCounts?.[pollItem.option] || 0) /
                    (Object.values(item.optionCounts || {}).reduce(
                      (acc, cur) => acc + cur,
                      0
                    ) || 1)) *
                  100;

                const isHighest =
                  Math.max(...Object.values(item.optionCounts || {})) ===
                  (item.optionCounts?.[pollItem.option] || 0);

                return (
                  <div
                    key={index}
                    className={`w-full overflow-hidden text-sm rounded-lg relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[var(--vote-width)] after:h-full after:rounded-lg ${
                      isHighest
                        ? "bg-primary01 bg-opacity-10 after:bg-primary03"
                        : "bg-gray03 bg-opacity-10 after:bg-gray03"
                    } p-3 text-gray01 flex items-center justify-between`}
                    style={{
                      ["--vote-width" as string]: `${votePercentage}%`,
                    }}
                  >
                    <p className="text-gray01 relative z-10">
                      {pollItem.option}
                    </p>
                    <p className="text-gray02 text-opacity-50 relative z-10 font-bold">
                      {Math.round(votePercentage)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* <div className="text-sm">
          댓글 <span className="font-bold">9</span>
        </div> */}
      </Link>
    </li>
  );
};

export default ListItem;
