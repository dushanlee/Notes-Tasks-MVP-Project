import { Link } from "react-router"

type Task = {
    id: number
    title: string
    description: string
    status: string
}

type Props = {
    tasks: Task[]
}

export default function RecentTasks({ tasks }: Props) {
    return (
    <div className="bg-white/70 rounded-xl shadow p-4 border-2 border-black/10 transition h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-black">Recent Tasks</h2>
                <Link
                    to="/tasks"
                    className="text-black text-sm bg-white rounded shadow px-3 py-1 hover:bg-gray-100 transition no-underline"
                >
                    View All
                </Link>
            </div>
            <ul className="space-y-2 flex-1">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link
                            to={`/tasks/${task.id}`}
                            className="block p-2 rounded hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <p className="font-medium text-black whitespace-nowrap">{task.title}</p>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        task.status === "complete"
                                            ? "bg-green-100 text-green-700"
                                            : task.status === "late"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="text-sm text-gray-500 truncate mt-1">{task.description}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
