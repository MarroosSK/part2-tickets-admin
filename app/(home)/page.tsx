"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginButton } from "../auth/_components/login-button";

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

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-6xl text-slate-600">
        Admin Dashboard
      </h1>
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
            asChild
          >
            <Link href={"/dashboard"}>Open Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
