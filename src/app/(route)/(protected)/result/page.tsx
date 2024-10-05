/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/app/components/Button";
import ResetIcon from "@public/icons/reset.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

import DownloadIcon from "@public/icons/dowonload.svg";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { useStore } from "@/app/store/useStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { formatWithCommas } from "@/app/utils/formatWithCommas";
import ResultPageLoading from "./loading";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

const ResultPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const { thatItemName, thatItemPrice, selectCondition } = useStore();
  const { data, isLoading, isSuccess } = useQuery<DataType>({
    queryKey: ["result"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/result/${id}`);
      const data = res.json();
      return data;
    },
  });

  useEffect(() => {
    if (!pageRef.current) return;

    const createBlob = async () => {
      try {
        const page = pageRef.current;
        setImageBlob(null);

        setTimeout(async () => {
          const canvas = await html2canvas(page as HTMLDivElement, {
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
            ${thatItemName} ${formatWithCommas(thatItemPrice)}원, 그돈이면 ${
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
              mobileWebUrl: "https://with-that-money.vercel.app",
              webUrl: "https://with-that-money.vercel.app",
            },
          },
          buttons: [
            {
              title: "자세히 보기",
              link: {
                mobileWebUrl: `https://with-that-money.vercel.app/result?id=${data?.id}`,
                webUrl: `https://with-that-money.vercel.app/result?id=${data?.id}`,
              },
            },
          ],
        });
      })
      .catch((err: any) => {
        alert("ERROR");
        alert(JSON.stringify(err));
      });
  };

  const handleClickReset = () => {
    window.location.replace("/ask-item");
  };

  if (isLoading) {
    return <ResultPageLoading />;
  }

  return (
    isSuccess && (
      <div
        className="px-6 pb-6 bg-result bg-cover min-h-inherit flex flex-col"
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
                  <p className="text-title-lg mb-1">
                    {thatItemName || data.name}{" "}
                    {formatWithCommas(thatItemPrice || data.price.toString())}
                    원,
                  </p>

                  <p className="w-fit text-title-lg shadow-[inset_0_-12px_0_rgba(152,255,187,1)]">
                    {selectCondition === "MORE"
                      ? "그 돈이면 이만큼 살 수 있어요!"
                      : "그 돈이면 이만큼이나 모아요!"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-y-8">
                {data.suggestedItems.map((item, index) => (
                  <div key={index} className="w-full">
                    <div className="w-full rounded-xl overflow-hidden h-48 relative bg-[url(/imgs/mock-image.avif)] bg-cover bg-center">
                      <div className="absolute top-2 right-2 rounded-lg flex items-center py-1 px-2 bg-black bg-opacity-60">
                        {data.recommendationType === "MORE" ? (
                          <>
                            <span className="text-white text-xs">
                              남은 돈:{" "}
                              {item.change === 0
                                ? item.change
                                : formatWithCommas(item.change.toString())}
                              원
                            </span>
                          </>
                        ) : (
                          <span className="text-white text-xs">
                            {item.percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                      <p className="mr-1 font-bold">
                        {item.name}{" "}
                        {data.recommendationType === "EXPENSIVE"
                          ? `${item.percentage}%`
                          : `X${item.quantity}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex justify-center w-full border-t border-gray04 mt-8 pt-4"
              data-html2canvas-ignore={true}
            >
              <div
                className="inline-flex items-center cursor-pointer"
                onClick={handleDownload}
              >
                <span className="mr-1 text-sm text-[#B2B9C0] font-bold">
                  이미지로 저장
                </span>
                <DownloadIcon />
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-t-lg p-4 bg-white border-t border-dashed"
          data-html2canvas-ignore={true}
        >
          <div className="text-center rounded-lg bg-[#ECF7F9] py-3 mb-5 font-semibold leading-snug text-gray01">
            과소비 방지 리포트가 만들어졌습니다. <br />
            친구에게 공유해 보세요.
          </div>

          <div className="flex">
            <Button color="plain" onClick={handleClickShare}>
              공유할래요
            </Button>
            <button
              type="button"
              className={`h-14 py-2.5 px-5 ml-2 rounded-xl border border-black`}
              onClick={handleClickReset}
            >
              <ResetIcon />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ResultPage;
