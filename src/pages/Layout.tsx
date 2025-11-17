import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 lg:p-8 ml-20 lg:ml-64">
        <div className="page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
