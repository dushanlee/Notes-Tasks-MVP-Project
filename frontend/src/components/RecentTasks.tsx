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
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-black">Recent Tasks</h2>
                <Link to="/tasks" className="text-blue-600 text-sm">
                    View All
                </Link>
            </div>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link
                            to={`/tasks/${task.id}`}
                            className="block p-2 rounded hover:bg-gray-100"
                        >
                            <p className="font-medium text-black">{task.title}</p>
                            <p className="text-sm text-gray-500 truncate">{task.description}</p>
                            <span
                                className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                                    task.status === "complete"
                                        ? "bg-green-100 text-green-700"
                                        : task.status === "late"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {task.status}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
