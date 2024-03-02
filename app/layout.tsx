import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";
import "./globals.css";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard for admins resolving tickets of application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-full">
            <SessionProvider>
              {children}
              <Toaster position="bottom-center" />
            </SessionProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
