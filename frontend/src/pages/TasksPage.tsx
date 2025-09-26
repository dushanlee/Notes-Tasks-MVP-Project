import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import { getAllTasks } from '../connections/taskApi';
import { deleteTasksBulk } from '../connections/taskDeleteApi';

export default function TasksPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleting, setDeleting] = useState(false);
    // Removed navigate, using <Link> for navigation

    useEffect(() => {
        setLoading(true);
        getAllTasks().then(data => {
            if (!data) {
                setError("Couldn't load tasks");
                setLoading(false);
                return;
            }
            setTasks(data);
            setFilteredTasks(data);
            setLoading(false);
        });
    }, []);

    function handleSearch(query: string) {
        if (!query.trim()) {
            setFilteredTasks(tasks);
        } else {
            const lower = query.toLowerCase();
            setFilteredTasks(
                tasks.filter(
                    task =>
                        task.title.toLowerCase().includes(lower) ||
                        task.description.toLowerCase().includes(lower) ||
                        task.status.toLowerCase().includes(lower)
                )
            );
        }
        setSelectedIds([]);
        setSelectAll(false);
    }

    function handleSelectId(id: number, checked: boolean) {
        setSelectedIds(prev =>
            checked ? [...prev, id] : prev.filter(tid => tid !== id)
        );
    }

    function handleSelectAll(checked: boolean) {
        setSelectAll(checked);
        setSelectedIds(checked ? filteredTasks.map(t => t.id) : []);
    }

    async function handleDeleteSelected() {
        if (selectedIds.length === 0) return;
        setDeleting(true);
        const ok = await deleteTasksBulk(selectedIds);
        if (ok) {
            const newTasks = tasks.filter(t => !selectedIds.includes(t.id));
            setTasks(newTasks);
            setFilteredTasks(newTasks);
            setSelectedIds([]);
            setSelectAll(false);
        } else {
            alert('Failed to delete selected tasks.');
        }
        setDeleting(false);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <div className="flex w-full h-full flex-1 bg-white rounded-xl">
            <div className="w-full space-y-6 px-4 md:px-8 border-2 border-black/10 dark:border-gray-700 rounded-xl shadow bg-white/70 dark:bg-gray-800 flex flex-col pt-8">
                <div className="flex items-center justify-between w-full mb-8 relative">
                    <h1 className="text-2xl font-bold text-black dark:text-white text-center w-full">
                        Tasks
                    </h1>
                    <Link
                        to="/tasks/new"
                        className="absolute right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-6 py-3 font-semibold text-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 whitespace-nowrap text-center cursor-pointer"
                    >
                        + New Task
                    </Link>
                </div>
                {tasks.length === 0 ? (
                    <p className="text-center w-full mt-4 mb-8">
                        No tasks available. Create a new task!
                    </p>
                ) : (
                    <>
                        <div className="w-full">
                            <SearchBar
                                placeholder="Search tasks..."
                                onSearch={handleSearch}
                            />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                            <span className="text-sm font-semibold text-gray-600 dark:text-white">
                                Total Tasks: {tasks.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={e =>
                                        handleSelectAll(e.target.checked)
                                    }
                                    aria-label="Select all tasks"
                                />
                                <span className="text-xs">Select All</span>
                                <button
                                    className="ml-2 px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold disabled:opacity-50"
                                    disabled={
                                        selectedIds.length === 0 || deleting
                                    }
                                    onClick={handleDeleteSelected}
                                >
                                    {deleting
                                        ? 'Deleting...'
                                        : `Delete Selected (${selectedIds.length})`}
                                </button>
                            </div>
                        </div>
                        <div className="w-full">
                            <TaskList
                                tasks={filteredTasks}
                                selectedIds={selectedIds}
                                onSelectId={handleSelectId}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
