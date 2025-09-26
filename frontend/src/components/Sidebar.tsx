import { NavLink } from 'react-router';
export default function Sidebar() {
    return (
        <aside className="w-64 bg-white dark:bg-gray-900 rounded-xl shadow p-6 m-6 flex flex-col border-2 border-black/10 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-8 text-black dark:text-white">
                My Workspace
            </h1>
            <nav className="flex flex-col gap-4 mb-8">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `px-3 py-2 rounded shadow bg-white dark:bg-gray-800 text-black dark:text-white no-underline transition ${
                            isActive
                                ? 'ring-2 ring-black/10 dark:ring-white/20'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/notes"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded shadow bg-white dark:bg-gray-800 text-black dark:text-white no-underline transition ${
                            isActive
                                ? 'ring-2 ring-black/10 dark:ring-white/20'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                    }
                >
                    Notes
                </NavLink>
                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded shadow bg-white dark:bg-gray-800 text-black dark:text-white no-underline transition ${
                            isActive
                                ? 'ring-2 ring-black/10 dark:ring-white/20'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                    }
                >
                    Tasks
                </NavLink>
            </nav>
        </aside>
    );
}
