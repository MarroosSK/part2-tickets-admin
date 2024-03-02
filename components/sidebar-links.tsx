import { cn } from "@/lib/utils";
import { navData } from "@/utils/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {navData.map((link, idx) => (
        <motion.div
          key={link.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 + idx / 10,
          }}
        >
          <Link href={link.href}>
            <span
              className={cn(
                "group flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === link.href ? "bg-accent" : "bg-transparent"
              )}
            >
              <link.icon className="mr-2 h-4 w-4 text-primary" />
              <span>{link.name}</span>
            </span>
          </Link>
        </motion.div>
      ))}
    </>
  );
};

export default SidebarLinks;
