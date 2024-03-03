import Sidebar from "@/components/sidebar";
import SidebarMobile from "@/components/sidebar-mobile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" md:pt-8 ">
      <div className="flex relative">
        <div className=" hidden md:block mt-4 w-15 md:w-64">
          <Sidebar />
        </div>
        <div className=" absolute top-0 left-0 z-[999] md:hidden  w-64 ">
          <SidebarMobile />
        </div>
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
