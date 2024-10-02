"use client";

import Button from "@/app/components/Button";
import { useStore } from "@/app/store/useStore";
import { nanoid } from "nanoid";
import Link from "next/link";
import AddCircle from "@public/icons/circle-add.svg";
import Chip from "@/app/components/select/Chip";
import { ChangeEvent, useEffect, useState } from "react";
import BottomSheet from "@/app/components/BottomSheet";
import { formatWithCommas } from "@/app/utils/formatWithCommas";
import usePriceChange from "@/app/hooks/usePriceChange";
import Item from "@/app/components/select/Item";
import Alert from "@/app/components/Alert";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type SelectedItem = {
  id: string;
  name: string;
  price: string;
  imgSrc?: string;
};

const categories = [
  {
    value: "food",
    label: "음식",
  },
  {
    value: "goods",
    label: "잡화",
  },
  {
    value: "culture",
    label: "문화생활",
  },
  {
    value: "beauty",
    label: "뷰티",
  },
  {
    value: "trip",
    label: "여행",
  },
  {
    value: "furniture",
    label: "가구",
  },
  {
    value: "ott",
    label: "OTT서비스",
  },
  {
    value: "pet",
    label: "반려동물용품",
  },
  {
    value: "electronics",
    label: "가전",
  },
];

const mockItems = [
  {
    id: "0",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "1",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "2",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "3",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "4",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "5",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "6",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "7",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "8",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "9",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "10",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "11",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "12",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "13",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
  {
    id: "14",
    name: "떡볶이",
    price: "9900",
    imgSrc: "/imgs/mock-image.png",
  },
];

const SelectPage = () => {
  const {
    thatItemName,
    thatItemPrice,
    selectCondition,
    selectItemList,
    addSelectItem,
    deleteItem,
    resetItem,
  } = useStore();

  // const { data } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: () =>
  //     fetch(
  //       `${API_URL}/category?type=${selectCondition}&price=${Number(
  //         thatItemPrice
  //       )}`
  //     ),
  // });

  // console.log("data", data);

  useEffect(() => {
    resetItem();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [addItemName, setAddItemName] = useState<string>("");
  const [addItemPrice, setAddItemPrice] = useState<string>("");

  const { handlePriceChange } = usePriceChange(addItemPrice, setAddItemPrice);

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

  const handleClickChip = (value: string) => {
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
      id: nanoid(),
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
    });
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  console.log(selectItemList);

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
        <div className="mt-16 flex flex-col gap-6">
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
            {categories.map((category, index) => (
              <Chip
                key={index}
                selectedCategory={selectedCategory}
                value={category.value}
                label={category.label}
                onClickChip={() => handleClickChip(category.value)}
              />
            ))}
          </div>

          <ul className="grid grid-cols-list gap-x-2 gap-y-5  overflow-y-auto">
            {mockItems.map((item) => (
              <Item
                id={item.id}
                key={item.id}
                name={item.name}
                price={item.price}
                imgSrc={item.imgSrc}
                onClickItem={() => handleClickItem(item)}
                selected={selectItemList.some(
                  (selectItem) => selectItem.id === item.id
                )}
              />
            ))}
          </ul>
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

      <Link href="/result" className="px-6 mb-7">
        <Button color="plain" disable={selectItemList.length === 0}>
          결과를 볼래요
        </Button>
      </Link>

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
            <div className="flex items-center">
              <input
                placeholder="1,000"
                className="font-bold text-lg py-3 pr-1 mr-2 flex-1 placeholder:text-lg"
                type="text"
                value={addItemPrice ? formatWithCommas(addItemPrice) : ""}
                onChange={handlePriceChange}
                pattern="\d*"
              />
              <span className="font-bold text-lg">원</span>
            </div>
            <span className="text-gray02 text-sm">
              *1,000원 이상 입력해 주세요
            </span>
          </div>
        </div>
        <Button
          color="plain"
          disable={
            addItemName === "" ||
            addItemPrice === "" ||
            Number(addItemPrice) < 1000
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
