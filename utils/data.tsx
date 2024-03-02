import {
  HomeIcon,
  LayoutDashboard,
  List,
  LucideIcon,
  Plus,
  Settings,
} from "lucide-react";

interface navLinksI {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navData: navLinksI[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Issues", href: "/issues", icon: List },
  { name: "New Issue", href: "/new", icon: Plus },
];
