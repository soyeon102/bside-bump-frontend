"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/useStore";
import { useEffect, useState } from "react";
import Alert from "@/app/components/Alert";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  const { thatItemName, thatItemPrice } = useStore();
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    if (thatItemName === "" || thatItemPrice === "") {
      setIsAlertOpen(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleRedirect = () => {
    setIsLoading(true);
    setIsAlertOpen(false);
    router.replace("/ask-item");
  };

  if (isLoading) {
    return null;
  }

  return isAlertOpen ? (
    <>
      <Alert
        isOpen={isAlertOpen}
        text={"망설이는 품목을 입력해주세요"}
        onClose={() => setIsAlertOpen(false)}
        onClickButton={handleRedirect}
      />
    </>
  ) : (
    <>{children}</>
  );
};

export default ProtectedLayout;
