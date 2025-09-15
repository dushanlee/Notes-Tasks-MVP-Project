import type { Task } from "../vite-env"
import TaskCard from "./TaskCard"

type TaskListProps = {
    tasks: Task[],
    selectedIds?: number[],
    onSelectId?: (id: number, checked: boolean) => void
}

export default function TaskList({ tasks, selectedIds, onSelectId }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className="text-gray-500">No tasks found.</p>
    }
    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    selected={!!selectedIds && selectedIds.includes(task.id)}
                    onSelect={onSelectId ? (checked) => onSelectId(task.id, checked) : undefined}
                />
            ))}
        </div>
    )
}
