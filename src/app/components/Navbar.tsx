"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import { useStore } from "../store/useStore";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetItem } = useStore();

  const showHeaderRoutes = [
    {
      navigation: "/ask-item",
      hasBack: true,
    },
    {
      navigation: "/ask-condition",
      hasBack: true,
    },
    {
      navigation: "/select",
      hasBack: true,
    },
  ];

  const findRoute = showHeaderRoutes.find(
    (route) => route.navigation === pathname
  );

  const handleClickBack = () => {
    router.back();
  };

  const handleClickToHome = () => {
    router.replace("/");
    resetItem();
  };

  return findRoute ? (
    <Header
      hasBack={findRoute.hasBack}
      onClickBack={
        pathname === "/ask-item" ? handleClickToHome : handleClickBack
      }
    />
  ) : null;
};

export default Navbar;
