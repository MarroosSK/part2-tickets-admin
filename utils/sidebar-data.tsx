import { SidebarLinksI } from "@/types/types";

import { SiGlassdoor } from "react-icons/si";
import { FaQuestion } from "react-icons/fa";
import { LuKanban } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";

export const SIDEBAR_ITEMS: SidebarLinksI[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <SiGlassdoor />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <LuKanban />,
    subMenu: true,
    subMenuItems: [
      { title: "All", path: "/products" },
      { title: "New", path: "/products/new" },
    ],
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <FaList />,
  },
  {
    title: "Feedbacks",
    path: "/feedback",
    icon: <MdMail />,
  },
  {
    title: "Account",
    path: "/account",
    icon: <FaPerson />,
  },
  {
    title: "Help",
    path: "/help",
    icon: <FaQuestion />,
  },
];
