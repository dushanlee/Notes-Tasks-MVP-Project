import { Outlet } from 'react-router'
import Sidebar from "./components/Sidebar"

export default function Layout() {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
