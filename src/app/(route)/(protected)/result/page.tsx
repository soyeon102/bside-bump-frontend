"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import {
  DownloadIcon,
  KakaoIcon,
  LinkIcon,
  ResetIcon,
} from "@/components/icons";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { useStore } from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { formatWithCommas } from "@/utils";
import ResultPageLoading from "./loading";

import { API_URL, BASE_URL } from "@/constants/url.const";

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ResultPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [isToast, setIsToast] = useState<boolean>(false);

  const { thatItemName, thatItemPrice, selectCondition, setResultItem } =
    useStore();
  const { data, isLoading, isSuccess } = useQuery<DataType>({
    queryKey: ["result", id],
    queryFn: async () => {
      await delay(3000);

      const res = await fetch(`${API_URL}/result/${id}`, { cache: "no-store" });
      const data = await res.json();
      setResultItem(data);
      return data;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (!pageRef.current) return;

    const createBlob = async () => {
      try {
        const page = pageRef.current;
        setImageBlob(null);

        setTimeout(async () => {
          const canvas = await html2canvas(page as HTMLDivElement, {
            useCORS: true,
            scale: 2,
          });
          canvas.toBlob((blob) => {
            if (blob !== null) {
              setImageBlob(blob);
            }
          });
        }, 500);
      } catch (error) {
        console.error(error);
        alert("이미지 저장을 실패했습니다. 다시 시도해주세요");
      }
    };

    createBlob();
  }, [pageRef, searchParams, isLoading]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsToast(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = () => {
    if (imageBlob === null) return;
    saveAs(imageBlob as Blob, "result.png");
  };

  const handleClickShare = () => {
    const { Kakao } = window;

    if (imageBlob === null) return;

    const file = new File([imageBlob], "image.png", {
      type: "image/png",
      lastModified: Date.now(),
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    Kakao.Share.uploadImage({
      file: dataTransfer.files,
    })
      .then((res: any) => {
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title:
              "지금, 구매를 망설이고 있나요?\n과소비 방지 서비스 <그돈이면>💸",
            description: `
            ${thatItemName} ${formatWithCommas(
              thatItemPrice || 0
            )}원, 그돈이면 ${
              data?.recommendationType === "MORE" ? "차라리" : "아껴서"
            } \n${
              data?.recommendationType === "MORE"
                ? data?.suggestedItems
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(" 또는 ")
                : `${data?.suggestedItems[0].name} ${data?.suggestedItems[0].percentage}%`
            } 사겠어요 \n\n #그돈이면차라리 #그돈이면아껴서`,
            imageUrl: res.infos.original.url,
            imageWidth: 400,
            imageHeight: 400,
            link: {
              mobileWebUrl: `${BASE_URL}/result?id=${data?.id}`,
              webUrl: `${BASE_URL}/result?id=${data?.id}`,
            },
          },
          buttons: [
            {
              title: "자세히 보기",
              link: {
                mobileWebUrl: `${BASE_URL}/result?id=${data?.id}`,
                webUrl: `${BASE_URL}/result?id=${data?.id}`,
              },
            },
          ],
        });
      })
      .catch((err: any) => {
        alert("ERROR");
        alert(err);
      });
  };

  const handleClickReset = () => {
    window.location.replace("/ask-item");
  };

  useEffect(() => {
    if (isToast) {
      setTimeout(() => {
        setIsToast(false);
      }, 2500);
    }
  }, [isToast]);

  if (isLoading) {
    return <ResultPageLoading />;
  }

  return (
    isSuccess &&
    !isLoading && (
      <>
        <div
          className="px-6 pb-6 min-h-inherit flex flex-col relative z-10"
          ref={pageRef}
        >
          <div className="w-full h-3 mt-2 mb-[2px]">
            <Image
              src="/imgs/result-pattern.png"
              alt="패턴"
              width={500}
              height={12}
              className="bg-repeat w-full"
            />
          </div>
          <div className="bg-white flex-1 rounded-b-lg p-6 flex">
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex flex-col items-center mb-10">
                  <p className="text-gray03 font-extrabold text-sm">[결과지]</p>
                  <div className="flex flex-col justify-center items-center mt-2">
                    <p className="text-title-lg mb-1 text-center">
                      {thatItemName || data.name}{" "}
                      <span className="text-primary04">
                        {formatWithCommas(thatItemPrice || data.price)}
                      </span>
                      원,
                    </p>

                    <p className="w-fit text-title-lg shadow-[inset_0_-12px_0_rgba(152,255,187,1)]">
                      {selectCondition === "MORE"
                        ? "그 돈이면 이런 걸 살 수 있어요!"
                        : "그 돈이면 이만큼 모을 수 있어요!"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-y-8">
                  {data.suggestedItems.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col justify-center"
                    >
                      <div
                        className={`min-w-28 w-fill-available h-auto mx-12 aspect-square rounded-xl overflow-hidde relative bg-contain bg-no-repeat bg-center`}
                        style={{
                          backgroundImage: `url("${API_URL}/public/images/icons/${item.iconUrl}")`,
                        }}
                      >
                        {data.recommendationType === "MORE" && (
                          <div className="absolute top-2 right-2 rounded-lg flex items-center py-1 px-2 bg-black bg-opacity-60">
                            <span className="text-white text-xs">
                              남은 돈:{" "}
                              {item.change === 0
                                ? item.change
                                : formatWithCommas(item.change)}
                              원
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 min-w-28 mx-12">
                        <div className="text-center">
                          <div className="mr-1 font-bold inline-block">
                            {item.name}
                          </div>
                          <div className="bg-primary04 rounded-md px-[6px] py-[2px]text-sm font-semibold inline-flex text-white ">
                            {data.recommendationType === "EXPENSIVE"
                              ? `${item.percentage}%`
                              : `X ${item.quantity}`}
                          </div>
                        </div>
                        {data.recommendationType === "EXPENSIVE" &&
                          item.percentage.toString() === "0.00" && (
                            <p className="text-center text-sm font-semibold text-[#FF3E60] mt-3 break-keep">
                              0.01%보다 작은 수치는 볼 수 없어요.
                            </p>
                          )}
                      </div>
                      {index < data.suggestedItems.length - 1 && (
                        <hr className="mt-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex justify-center w-full mt-8"
                data-html2canvas-ignore={true}
              >
                <div
                  className="inline-flex items-center cursor-pointer"
                  onClick={handleClickReset}
                >
                  <span className="mr-1 text-sm text-gray02 font-bold">
                    다시하기
                  </span>
                  <ResetIcon />
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg p-4 bg-white border-t border-dashed"
            data-html2canvas-ignore={true}
          >
            <div className="flex flex-col gap-2">
              <Button color="plain" onClick={() => router.push("/form")}>
                게시할래요
              </Button>
              <Button
                color="transparent"
                onClick={() => router.push("/community")}
              >
                다른 사람 게시글 구경가기
              </Button>
              <div className="flex justify-center items-center gap-6 my-3 relative">
                <button
                  className="flex flex-col items-center"
                  onClick={handleClickShare}
                >
                  <KakaoIcon />
                  <span className="text-sm text-gray02 font-semibold mt-1">
                    공유하기
                  </span>
                </button>
                <span className="w-[1px] h-7 bg-gray-200 inline-block"></span>
                <button
                  className="flex flex-col items-center"
                  onClick={() => handleCopy(`${BASE_URL}/result?id=${id}`)}
                >
                  <LinkIcon />
                  <span className="text-sm text-gray02 font-semibold mt-1">
                    링크복사
                  </span>
                </button>
                <span className="w-[1px] h-7 bg-gray-200 inline-block"></span>
                <button
                  className="flex flex-col items-center"
                  onClick={handleDownload}
                >
                  <DownloadIcon />
                  <span className="text-sm text-gray02 font-semibold mt-1">
                    이미지 저장
                  </span>
                </button>
                {isToast && (
                  <div
                    className={`bg-gray02 bg-opacity-80 text-white font-bold text-sm absolute -top-8 px-5 py-3 rounded-half animate-fade-in`}
                  >
                    링크가 클립보드에 복사되었어요
                  </div>
                )}
              </div>
            </div>
          </div>

          <Image
            src={"/imgs/result-background.png"}
            alt="결과지 배경"
            fill
            className="-z-10 object-cover"
          />
        </div>
      </>
    )
  );
};

export default ResultPage;
