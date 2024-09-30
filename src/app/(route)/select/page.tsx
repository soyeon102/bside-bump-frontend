"use client";

import Button from "@/app/components/Button";
import List from "@/app/components/select/List";
import { useStore } from "@/app/store/useStore";
import { nanoid } from "nanoid";
import Link from "next/link";

type ComparisonItem = {
  id: string;
  name: string;
  price: number;
  isEditable: boolean;
};

const SelectPage = () => {
  const {
    thatItemName,
    thatItemPrice,
    selectCondition,
    comparisonItemList,
    setComparisonItemList,
  } = useStore();

  const handleClickAddItem = (item: ComparisonItem) => {
    setComparisonItemList(item);
  };

  // const handleUpdateItem = (id: string, field) => {

  // }

  const rendereAddItem = () => {
    if (
      (selectCondition === "more" && comparisonItemList.length < 3) ||
      (selectCondition === "save" && comparisonItemList.length < 1)
    ) {
      return (
        <>
          <div
            className="cursor-pointer"
            onClick={() =>
              handleClickAddItem({
                id: nanoid(),
                name: "",
                price: 0,
                isEditable: true,
              })
            }
          >
            + 직접 추가하기
          </div>
          <div className="cursor-pointer">+ 카테고리 선택하기</div>
        </>
      );
    }
  };

  return (
    <>
      <div className="px-6 flex-1">
        <p>
          {thatItemName} {thatItemPrice}
        </p>
        {selectCondition === "more" ? (
          <p>그 돈이면 차라리 이런걸 사겠어요</p>
        ) : (
          <p>그 돈이면 아껴서 이걸 사겠어요</p>
        )}

        <List itemList={comparisonItemList} />

        <p>
          품목
          {selectCondition === "save" && (
            <span>*최대 1개까지 입력할 수 있어요.</span>
          )}
        </p>
        {rendereAddItem()}
      </div>

      <Link href="/result" className="px-6">
        <Button color="plain">결과를 볼래요</Button>
      </Link>
    </>
  );
};

export default SelectPage;
