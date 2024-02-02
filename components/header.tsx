"use client";

import { LoginButton } from "@/app/auth/_components/login-button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logoImg from "../public/tickets-logo2.png";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { Spinner } from "./spinner";

export const Header = () => {
  const { status } = useSession();

  return (
    <header
      className={
        "fixed w-full z-0 px-4 shadow-sm shadow-gray-900/200 pl-[50px] md:pl-[100px] pr-[50px] md:pr-[100px]"
      }
    >
      <div className="flex items-center justify-between h-16 mt-4">
        <Image src={logoImg} height={40} width={90} alt="logo" />

        <div className="flex items-center justify-between gap-x-2 sm:order-2 order-1">
          <div className="p-2">
            {" "}
            <ThemeSwitcher />
          </div>
          <div className="h-10 w-10 rounded-full bg-bg-sidebar-muted flex items-center justify-center text-center">
            {status === "loading" && <Spinner />}
            {status === "authenticated" && <UserNav />}
            {status === "unauthenticated" && (
              <div>
                <LoginButton>
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </LoginButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
