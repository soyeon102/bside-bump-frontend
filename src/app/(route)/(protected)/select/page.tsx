"use client";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { customAlphabet } from "nanoid";
import Image from "next/image";

import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Alert from "@/components/Alert";
import BottomSheet from "@/components/BottomSheet";
import { TextField } from "@/components/TextField";
import {
  CircleAddIcon,
  AddItemIcon,
  SearchIcon,
  CheckedIcon,
} from "@/components/icons";
import Item from "./_components/Item";

import Loading from "@/app/loading";
import { useStore } from "@/store/useStore";
import { API_URL } from "@/constants/url.const";
import { formatWithCommas } from "@/utils";
import usePriceChange from "@/hooks/usePriceChange";
import {
  SelectedItem,
  CategoryData,
  RecommendedItem,
  Condition,
} from "@/types/item";

type PostItemType = {
  name: string;
  price: number;
  type: Condition;
  recommendedItems?: RecommendedItem[];
};

interface SearchResponse {
  urls: {
    small: string;
    raw: string;
    full: string;
  }[];
}

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

  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [addItemName, setAddItemName] = useState<string>("");
  const [addItemPrice, setAddItemPrice] = useState<number | null>(null);
  const [isSearchImageModalOpen, setIsSearchImageModalOpen] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [queryTerm, setQueryTerm] = useState<string>("");
  const [selectImage, setSelectImage] = useState<string>("");

  const { handlePriceChange } = usePriceChange(setAddItemPrice);

  const nanoid = customAlphabet("0123456789", 10);

  const { data, isLoading, isSuccess } = useQuery<CategoryData[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/category?type=${selectCondition}&price=${thatItemPrice}`
      );
      const data = await res.json();
      return data;
    },
  });

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["searchList", queryTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${API_URL}/category/image?keyword=${queryTerm}&page=${pageParam}`
      );
      const data = (await res.json()) as SearchResponse;
      return data.urls;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 데이터가 없으면 다음 페이지 없음
      if (!lastPage || lastPage.length === 0) return undefined;
      // 다음 페이지는 현재 페이지 수 + 1
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setSelectedCategory(
        data.find((item) => item.products.length !== 0)?.id ?? 1
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    resetItemList();
  }, [resetItemList]);

  // queryTerm이바뀔 때마다 스크롤 초기화
  const firstPageData = searchData?.pages[0];

  useEffect(() => {
    if (queryTerm) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      });
    }
  }, [firstPageData, queryTerm]);

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
    setAddItemPrice(null);
    setSelectImage("");
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
      iconUrl: "",
      imageUrl: selectImage,
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
      imageUrl: "",
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

  const handleSearch = async () => {
    if (!searchTerm) return;
    setQueryTerm(searchTerm);
    // await fetchNextPage();
  };

  useEffect(() => {
    if (queryTerm) {
      refetch();
    }
  }, [queryTerm, refetch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasNextPage &&
      !isSearchLoading
    ) {
      fetchNextPage();
    }
  };

  const handleSelectImage = (imageSrc: string) => {
    setSelectImage(imageSrc);
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
              <CircleAddIcon />
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

          {isSuccess &&
            (data.every((category) => category.products.length === 0) ? (
              <div className="w-full h-full flex-1 flex flex-col justify-center items-center text-center gap-y-5">
                <AddItemIcon />
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
        </div>
      </div>
      <div className="mx-6 bg-white py-7 border-t-gray04 border-t flex gap-x-5 overflow-x-auto overflow-y-hidden mt-2">
        {selectItemList.map((item) => (
          <Chip
            key={item.id}
            hasDelete={true}
            label={`${item.name} ${formatWithCommas(item.price)}원`}
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
        <div className="flex flex-col gap-7">
          <div>
            <TextField
              placeholder="우육면"
              value={addItemName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddItemName(e.target.value)
              }
              maxLength={20}
              labelText=" 직접 추가할 품목"
              required
            />
          </div>
          <div>
            <TextField
              placeholder="1,000"
              value={addItemPrice ? formatWithCommas(addItemPrice) : ""}
              onChange={handlePriceChange}
              maxLength={12}
              pattern="\d*"
              labelText="가격"
              unitText="원"
              required
            />
          </div>
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between flex-wrap">
              <p>이미지 직접 추가</p>
              <p className="text-sm">*선택한 이미지는 결과지에 표시돼요</p>
            </div>
            <div
              className="h-12 border-gray03 border rounded-md p-3 flex items-center cursor-pointer justify-between"
              onClick={() => setIsSearchImageModalOpen(true)}
            >
              {selectImage ? (
                <>
                  <Image
                    src={selectImage}
                    alt="image"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <p>변경</p>
                </>
              ) : (
                <>
                  <p className="mr-2">이미지 검색</p>
                  <SearchIcon />
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          color="plain"
          disable={
            addItemName === "" ||
            addItemPrice === null ||
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

      {/* 이미지 검색 모달 */}
      <BottomSheet
        isOpen={isSearchImageModalOpen}
        onClose={() => setIsSearchImageModalOpen(false)}
      >
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between flex-wrap">
            <p>이미지 직접 추가</p>
            <p className="text-sm">*선택한 이미지는 결과지에 표시돼요</p>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="이미지 검색"
              className="w-full h-12 border-gray03 border rounded-md p-3 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={handleSearch}
            >
              <SearchIcon />
            </span>
          </div>
          {(!searchData && !isSearchFetching) ||
          searchData?.pages.flat().length === 0 ? (
            <div className="min-h-80 flex items-center justify-center">
              {searchData?.pages.flat().length === 0
                ? `검색 결과가 없습니다.`
                : `검색어를 입력해주세요`}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="grid grid-cols-3 gap-2 overflow-y-auto min-h-80 max-h-80"
              onScroll={handleScroll}
            >
              {isSearchLoading
                ? Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-full aspect-square bg-gray03 rounded-lg"
                    ></div>
                  ))
                : searchData?.pages
                    .flat()
                    .filter(Boolean)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={`w-full aspect-square rounded-lg overflow-hidden border cursor-pointer relative`}
                        onClick={() => handleSelectImage(item.small)}
                      >
                        <Image
                          className={`object-cover w-full h-full ${
                            item.small === selectImage && "brightness-50"
                          }`}
                          src={item.small}
                          alt="search-item"
                          width={0}
                          height={0}
                          sizes="100vw"
                        />
                        {item.small === selectImage && (
                          <div className="absolute top-1 right-1">
                            <CheckedIcon />
                          </div>
                        )}
                      </div>
                    ))}
            </div>
          )}
        </div>
      </BottomSheet>
      {/* 이미지 검색 모달 */}
    </>
  );
};

export default SelectPage;
