import { NavLink } from "react-router"

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-50 border-r p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-8 text-black">My Workspace</h1>
            <nav className="flex flex-col gap-4">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                            isActive
                                ? "bg-gray-100 text-black visited:text-black"
                                : "text-black visited:text-black hover:bg-gray-150"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/notes"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                            isActive
                                ? "bg-gray-100 text-black visited:text-black"
                                : "text-black visited:text-black hover:bg-gray-150"
                        }`
                    }
                >
                    Notes
                </NavLink>

                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                            isActive
                                ? "bg-gray-100 text-black visited:text-black"
                                : "text-black visited:text-black hover:bg-gray-150"
                        }`
                    }
                >
                    Tasks
                </NavLink>
            </nav>
        </aside>
    )
}
