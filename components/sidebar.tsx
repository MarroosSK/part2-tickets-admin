"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarLinks from "./sidebar-links";
import { SkeletonAvatar } from "./skeleton-avatar";
import { ThemeSwitcher } from "./theme-switcher";
import { UserNav } from "./user-nav";

const Sidebar = () => {
  const [status, setStatus] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setStatus(true);
  }, []);
  return (
    <nav className="grid items-start gap-2 sticky top-[50px] overflow-hidden">
      <div className="flex items-center justify-between gap-x-2 p-4 border-b">
        {status ? <UserNav /> : <SkeletonAvatar />}
        <ThemeSwitcher />
      </div>
      <div>
        <SidebarLinks />
      </div>
    </nav>
  );
};

export default Sidebar;
