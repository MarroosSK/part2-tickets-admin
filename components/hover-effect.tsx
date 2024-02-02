import { cn } from "@/lib/utils";
import React from "react";

const HoverEffect = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
} & { isActive?: boolean }) => {
  return (
    <div
      className={cn(
        "  hover:bg-slate-400  dark:hover:bg-slate-400  transition-all cursor-pointer rounded-xl w-full",
        { " font-bold text-white bg-slate-500": isActive }
      )}
    >
      {children}
    </div>
  );
};

export default HoverEffect;
