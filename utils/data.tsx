import { HomeIcon, LayoutDashboard, LucideIcon } from "lucide-react";

interface navLinksI {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navData: navLinksI[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];
