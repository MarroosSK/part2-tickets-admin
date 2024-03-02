"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { DoorOpen, Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import SidebarLinks from "./sidebar-links";
import { SkeletonAvatar } from "./skeleton-avatar";
import { UserNav } from "./user-nav";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [themePicked, setThemePicked] = useState(false);
  const { setTheme } = useTheme();

  const ref = useRef(null);

  useClickAway(ref, () => setIsOpen(false));

  const handleTheme = (schema: string) => {
    setTheme(schema);
    setThemePicked(!themePicked);
  };

  useEffect(() => {
    setStatus(true);
  }, []);

  return (
    <div ref={ref}>
      <div className="fixed h-full z-[1001]">
        <Hamburger toggled={isOpen} size={20} toggle={setIsOpen} />
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-slate-300 dark:bg-slate-600 border-b border-b-white/20",
            isOpen ? "block" : "hidden"
          )}
        >
          <nav className="grid items-start gap-2 sticky top-[50px] overflow-hidden">
            <div className="flex items-center justify-between gap-x-2 p-4 border-b">
              {status ? <UserNav /> : <SkeletonAvatar />}

              {themePicked ? (
                <Sun onClick={() => handleTheme("light")} />
              ) : (
                <Moon onClick={() => handleTheme("dark")} />
              )}
            </div>
            <div>
              <SidebarLinks />
              <span
                className={cn(
                  "group flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                )}
                onClick={() => signOut()}
              >
                <DoorOpen className="mr-2 h-4 w-4 text-primary" />
                <span>Logout</span>
              </span>
            </div>
          </nav>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SidebarMobile;
