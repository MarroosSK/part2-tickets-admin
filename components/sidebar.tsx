"use client";

import {
  DoorOpen,
  Home,
  LayoutDashboard,
  List,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import HoverEffect from "./hover-effect";

export const Sidebar = () => {
  const settings = useSettings();
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <HoverEffect isActive={pathname === "/"}>
        <Link
          href="/"
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">Home</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <Home className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
      <HoverEffect isActive={pathname === "/dashboard"}>
        <Link
          href="/dashboard"
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">Dashboard</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <LayoutDashboard className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
      <HoverEffect isActive={pathname === "/issues"}>
        <Link
          href="/issues"
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">Tickets</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <List className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
      <HoverEffect isActive={pathname === "/settings"}>
        <Link
          href=""
          onClick={settings.onOpen}
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">Settings</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <Settings className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
      <HoverEffect isActive={pathname === "/new"}>
        <Link
          href="https://part1-tickets-form.vercel.app"
          target="_blank"
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">New Ticket</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <Plus className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
      <HoverEffect isActive={pathname === "/logout"}>
        <Link
          href=""
          onClick={() => signOut()}
          className="p-2 font-medium text-xs flex items-center mb-1"
        >
          <span className="hidden md:block pl-0 md:pl-4">Logout</span>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto"
          >
            <DoorOpen className="h-4 w-4 hover:bg-transparent" />
          </Button>
        </Link>
      </HoverEffect>
    </div>
  );
};
