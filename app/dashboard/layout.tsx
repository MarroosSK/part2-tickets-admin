import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-10 md:pt-14 px-4   mx-auto">
      <div className="flex ">
        <div className="mt-16 w-15 md:w-64">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
