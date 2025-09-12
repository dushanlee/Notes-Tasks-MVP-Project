import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import TaskList from "../components/TaskList"
import SearchBar from "../components/SearchBar"
import { getAllTasks } from "../connections/taskApi"
import type { Task } from "../vite-env"

export default function TasksPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getAllTasks().then((data) => {
            if (!data) {
                setError("Couldn't load tasks")
                setLoading(false)
                return
            }
            setTasks(data)
            setFilteredTasks(data)
            setLoading(false)
        })
    }, [])

    function handleSearch(query: string) {
        if (!query.trim()) {
            setFilteredTasks(tasks)
        } else {
            const lower = query.toLowerCase()
            setFilteredTasks(
                tasks.filter(
                    (task) =>
                        task.title.toLowerCase().includes(lower) ||
                        task.description.toLowerCase().includes(lower) ||
                        task.status.toLowerCase().includes(lower)
                )
            )
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>
    if (tasks.length === 0) {
        return (
            <div className="flex justify-center w-full h-full flex-1">
                <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold text-black text-center w-full mb-8">Tasks</h1>
                    <p>No tasks available. Create a new task!</p>
                    <button
                        className="block w-full bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10 mt-4"
                        onClick={() => navigate("/tasks/new")}
                    >
                        + New Task
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center w-full h-full flex-1">
            <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex-1 flex flex-col">
                <div className="flex flex-col items-center w-full mt-2 mb-2">
                    <h1 className="text-2xl font-bold text-black text-center w-full">Tasks</h1>
                        <div className="w-full flex justify-end mt-2 mb-8">
                            <button
                                onClick={() => navigate("/tasks/new")}
                                className="bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10"
                            >
                                + New Task
                            </button>
                        </div>
                </div>
                <div className="w-full">
                    <SearchBar placeholder="Search tasks..." onSearch={handleSearch} />
                </div>
                <div className="w-full">
                    <TaskList tasks={filteredTasks} />
                </div>
            </div>
        </div>
    )
}
