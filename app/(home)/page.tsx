"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bug, Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { LoginButton } from "../auth/_components/login-button";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-5">
      <div className="flex items-center justify-center flex-col">
        <div className="text-3xl md:text-4xl bg-gradient-to-r from-slate-600 to-indigo-600  text-white px-4 p-2 rounded-md pb-4 w-fit">
          Tickets Panel
        </div>
      </div>

      <div
        className={cn(
          "text-xl md:text-6xl text-zinc-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Admin Dashboard
      </div>
      {status === "loading" && <Spinner />}
      {status === "authenticated" && <p>Signed in as {session?.user?.email}</p>}
      <div className="flex gap-x-4">
        {status === "unauthenticated" && (
          <div>
            <LoginButton>
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </LoginButton>
          </div>
        )}
        {status === "authenticated" && (
          <Button
            className="mt-6 bg-indigo-500 text-white hover:bg-indigo-700 hover:text-indigo-100 transition-all"
            size="lg"
          >
            <Link href={"/dashboard"}>Open Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
