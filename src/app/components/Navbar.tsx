"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

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

  return findRoute ? (
    <Header hasBack={findRoute.hasBack} onClickBack={handleClickBack} />
  ) : null;
};

export default Navbar;
