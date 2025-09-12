import type { TaskListProps } from "../vite-env"
import TaskCard from "./TaskCard"

export default function TaskList({ tasks }: TaskListProps) {
    if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found.</p>
    }

    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}
