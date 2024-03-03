"use client";

import { useEffect, useState } from "react";
import SidebarLinks from "./sidebar-links";
import { ThemeSwitcher } from "./theme-switcher";
import { UserNav } from "./user-nav";
import { SkeletonBox } from "./skeletons/skeleton-box";

const Sidebar = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(true);
  }, []);
  return (
    <nav className="grid items-start gap-2 sticky top-[50px] overflow-hidden">
      {status ? (
        <>
          <div className="flex items-center justify-between gap-x-2 p-4 border-b">
            <UserNav />
            <ThemeSwitcher />
          </div>
          <div>
            <SidebarLinks />
          </div>
        </>
      ) : (
        <SkeletonBox />
      )}
    </nav>
  );
};

export default Sidebar;
