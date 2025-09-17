import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
export default function Layout() {
  return (
    <div className="flex h-screen bg-white text-black dark:bg-gray-900 dark:text-white relative">
      <Sidebar />
      <main className="flex-1 px-4 md:px-8 py-6 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
