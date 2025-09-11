import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import TaskList from "../components/TaskList"
import SearchBar from "../components/SearchBar"
import Error from "../components/Error"
import { getAllTasks } from "../connections/taskApi"

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
            <>
                <Error />
                <p>No tasks available</p>
            </>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">Tasks</h1>
                <button
                    onClick={() => navigate("/tasks/new")}
                    className="block p-2 border rounded bg-white shadow hover:shadow-md transition"
                >
                    + New Task
                </button>
            </div>

            <SearchBar placeholder="Search tasks..." onSearch={handleSearch} />

            <TaskList tasks={filteredTasks} />
        </div>
    )
}
