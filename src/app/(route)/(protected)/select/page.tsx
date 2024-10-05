"use client";

import Button from "@/app/components/Button";
import { useStore } from "@/app/store/useStore";
import { customAlphabet } from "nanoid";
import AddCircle from "@public/icons/circle-add.svg";
import Chip from "@/app/components/select/Chip";
import EmptyIcon from "@public/icons/empty-list.svg";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import BottomSheet from "@/app/components/BottomSheet";
import { formatWithCommas } from "@/app/utils/formatWithCommas";
import usePriceChange from "@/app/hooks/usePriceChange";
import Item from "@/app/components/select/Item";
import Alert from "@/app/components/Alert";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Condition = "MORE" | "EXPENSIVE";

interface ItemType {
  name: string;
  price: string;
  iconUrl?: string;
}

interface SelectedItem extends ItemType {
  id: number;
}

interface DataType {
  id: number;
  name: string;
  products: SelectedItem[];
}

interface RecommendedItemType {
  name: string;
  price: number;
  iconUrl?: string | undefined;
}

type PostItemType = {
  name: string;
  price: number;
  type: Condition;
  recommendedItems?: RecommendedItemType[];
};

const SelectPage = () => {
  const {
    thatItemName,
    thatItemPrice,
    selectCondition,
    selectItemList,
    addSelectItem,
    deleteItem,
    resetItemList,
  } = useStore();

  const { data, isLoading, isSuccess } = useQuery<DataType[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/category?type=${selectCondition}&price=${Number(
          thatItemPrice
        )}`
      );
      const data = res.json();
      return data;
    },
  });

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [addItemName, setAddItemName] = useState<string>("");
  const [addItemPrice, setAddItemPrice] = useState<string>("");

  const { handlePriceChange } = usePriceChange(addItemPrice, setAddItemPrice);

  const nanoid = customAlphabet("0123456789", 10);

  useEffect(() => {
    if (isSuccess) {
      setSelectedCategory(
        data.find((item) => item.products.length !== 0)?.id ?? 1
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    resetItemList();
  }, []);

  const openBottomSheet = () => {
    if (selectCondition === "MORE" && selectItemList.length >= 3) {
      setIsAlertOpen(true);
      showAlert("품목은 최대 3개까지만 입력할 수 있어요");
      return;
    }
    if (selectCondition === "EXPENSIVE" && selectItemList.length >= 1) {
      setIsAlertOpen(true);
      showAlert("품목은 최대 1개까지만 입력할 수 있어요");
      return;
    }

    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setAddItemName("");
    setAddItemPrice("");
    setIsBottomSheetOpen(false);
  };

  const handleClickChip = (value: number) => {
    setSelectedCategory(value);
  };

  const handleClickAddItem = () => {
    if (
      selectCondition === "MORE" &&
      Number(thatItemPrice) <= Number(addItemPrice)
    ) {
      setIsAlertOpen(true);
      showAlert(
        `가격이 너무 높아요 구매를 망설이는 품목의 가격보다 낮은 가격을 입력해 보세요`
      );
      return;
    }

    if (
      selectCondition === "EXPENSIVE" &&
      Number(thatItemPrice) >= Number(addItemPrice)
    ) {
      setIsAlertOpen(true);
      showAlert(
        `가격이 너무 낮아요 구매를 망설이는 품목의 가격보다 높은 가격을 입력해 보세요`
      );
      return;
    }

    addSelectItem({
      id: Number(nanoid()),
      name: addItemName,
      price: Number(addItemPrice),
    });
    closeBottomSheet();
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };

  const handleClickItem = (item: SelectedItem) => {
    if (selectItemList.some((el) => el.id === item.id)) {
      deleteItem(item.id);
      return;
    }
    if (selectCondition === "MORE" && selectItemList.length >= 3) {
      setIsAlertOpen(true);
      showAlert("품목은 최대 3개까지만 입력할 수 있어요");
      return;
    }

    if (selectCondition === "EXPENSIVE" && selectItemList.length >= 1) {
      setIsAlertOpen(true);
      showAlert("품목은 최대 1개까지만 입력할 수 있어요");
      return;
    }

    addSelectItem({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      iconUrl: item.iconUrl,
    });
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(id);
  };

  const postResult = useMutation({
    mutationKey: ["postResult"],
    mutationFn: async (body: PostItemType) =>
      await fetch(`${API_URL}/result`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: async (res: Response) => {
      const data = await res.json();
      router.push(`/result?id=${data.id}`);
    },
  });

  const handleClickToResult = async () => {
    if (selectCondition === null) return;

    postResult.mutate({
      name: thatItemName,
      price: Number(thatItemPrice),
      type: selectCondition,
      recommendedItems: selectItemList,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="px-6 flex-1 flex flex-col">
        <p className="text-title-lg mb-1">
          {thatItemName} {Number(thatItemPrice).toLocaleString()}원
        </p>
        <p className="text-title-lg">
          {selectCondition === "MORE"
            ? "그 돈이면 차라리 이런걸 사겠어요"
            : "그 돈이면 아껴서 이런걸 사겠어요"}
        </p>
        <div className="mt-16 flex flex-col gap-6 flex-1">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-title-sm">추가할 품목을 선택해주세요</p>
            <div
              className="flex items-center cursor-pointer"
              onClick={openBottomSheet}
            >
              <AddCircle />
              <span className="ml-1 text-gray02 text-sm font-semibold">
                직접 추가하기
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {isSuccess &&
              data
                .filter((item) => item.products.length !== 0)
                .map((category) => (
                  <Chip
                    key={category.id}
                    selectedCategory={selectedCategory}
                    value={category.id}
                    label={category.name}
                    onClickChip={() => handleClickChip(category.id)}
                  />
                ))}
          </div>

          <Suspense fallback={<>Loaidng</>}>
            {isSuccess &&
              (data.every((category) => category.products.length === 0) ? (
                <div className="w-full h-full flex-1 flex flex-col justify-center items-center text-center gap-y-5">
                  <EmptyIcon />
                  <p className="break-keep text-gray02 font-semibold">
                    입력하신 품목보다 높은 가격의 추천 품목이 없어요 <br />
                    품목을 직접 추가해 보세요
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-list gap-x-2 gap-y-5 overflow-y-auto">
                  {data
                    .find((category) => category.id === selectedCategory)
                    ?.products.map((item, idx) => (
                      <Item
                        id={item.id}
                        key={idx}
                        name={item.name}
                        price={item.price}
                        iconUrl={item.iconUrl}
                        onClickItem={() => handleClickItem(item)}
                        selected={selectItemList.some(
                          (selectItem) => selectItem.id === item.id
                        )}
                      />
                    ))}
                </ul>
              ))}
          </Suspense>
        </div>
      </div>
      <div className="mx-6 bg-white py-7 border-t-gray04 border-t flex gap-x-5 overflow-x-auto overflow-y-hidden mt-2">
        {selectItemList.map((item) => (
          <Chip
            key={item.id}
            hasDelete={true}
            label={`${item.name} ${formatWithCommas(
              item.price.toLocaleString()
            )}원`}
            value={item.id}
            onClickDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </div>

      <div className="px-6 mb-7">
        <Button
          color="plain"
          disable={selectItemList.length === 0}
          onClick={handleClickToResult}
        >
          결과를 볼래요
        </Button>
      </div>

      {/* 모달 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <div>
          <div className="mb-12">
            <p className="mb-3">직접 추가할 품목</p>
            <input
              type="text"
              value={addItemName}
              className="font-bold text-lg py-3 w-full"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddItemName(e.target.value)
              }
              maxLength={20}
            />
          </div>
          <div className="mb-6">
            <p className="mb-3">가격</p>
            <div className="flex items-center w-full">
              <input
                placeholder="1"
                className="font-bold text-lg py-3 pr-1 mr-2 flex-1 placeholder:text-lg w-fill-available"
                type="text"
                value={addItemPrice ? formatWithCommas(addItemPrice) : ""}
                onChange={handlePriceChange}
                pattern="\d*"
                maxLength={12}
              />
              <span className="font-bold text-lg">원</span>
            </div>
          </div>
        </div>
        <Button
          color="plain"
          disable={
            addItemName === "" ||
            addItemPrice === "" ||
            Number(addItemPrice) < 1
          }
          onClick={handleClickAddItem}
        >
          다 입력했어요
        </Button>
      </BottomSheet>
      {/* 모달 */}

      {/* 알럿 */}
      <Alert
        isOpen={isAlertOpen}
        text={alertMessage}
        onClose={() => setIsAlertOpen(false)}
        onClickButton={() => setIsAlertOpen(false)}
      />
      {/* 알럿 */}
    </>
  );
};

export default SelectPage;
