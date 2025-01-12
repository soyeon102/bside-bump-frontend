"use client";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import Header from "./Header";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetItem } = useStore();

  const showHeaderRoutes = [
    {
      navigation: "/ask-item",
      hasBack: true,
      title: "",
    },
    {
      navigation: "/ask-condition",
      hasBack: true,
      title: "",
    },
    {
      navigation: "/select",
      hasBack: true,
      title: "",
    },
    {
      navigation: "/community",
      hasBack: true,
      title: "살까말까 게시판",
    },
    {
      navigation: "/form",
      hasBack: true,
      title: "",
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
      title={findRoute.title}
      onClickBack={
        pathname === "/ask-item" ? handleClickToHome : handleClickBack
      }
    />
  ) : null;
};

export default Navbar;
