import { Link } from "react-router"
import type { TaskCardProps } from "../vite-env"

export default function TaskCard({ task }: TaskCardProps) {
    const statusColors: Record<string, string> = {
        pending: "bg-yellow-200 text-yellow-800",
        complete: "bg-green-200 text-green-800",
        late: "bg-red-200 text-red-800",
    }

    return (
        <Link
            to={`/tasks/${task.id}`}
            className="block border-2 border-black/10 rounded-xl p-4 shadow bg-white/80 hover:bg-gray-100 transition text-left"
        >
            <h2 className="font-bold text-lg text-black mb-1">{task.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{task.description}</p>

            <div className="flex items-center gap-1">
                {task.due_date && (
                    <span className="text-xs text-gray-500">
                        Due: {new Date(task.due_date + 'Z').toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}
                    </span>
                )}
                <span
                    className={`px-1.5 py-0.5 text-xs font-medium rounded leading-tight ${
                        statusColors[task.status] || "bg-gray-200 text-gray-800"
                    }`}
                >
                    {task.status}
                </span>
            </div>

            <p className="text-xs text-gray-500">
                Created: {new Date(task.created_at).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}
            </p>
        </Link>
    )
}
