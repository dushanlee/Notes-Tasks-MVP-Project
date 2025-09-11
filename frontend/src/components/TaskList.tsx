import TaskCard from "./TaskCard"

export default function TaskList({ tasks }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className="text-gray-500">No tasks found.</p>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}
