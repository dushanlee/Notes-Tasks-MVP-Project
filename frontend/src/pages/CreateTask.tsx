import { useState } from "react"
import { useNavigate } from "react-router"
import TaskForm from "../components/TaskForm"
import { createTask } from "../connections/taskApi"

export default function CreateTask() {
    const [error, setError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(
        title: string,
        description: string,
        status: string,
        due_date: string | null
    ) {
        if (!title) {
            setValidationError("Title is required")
            return
        }
        if (!description) {
            setValidationError("Description is required")
            return
        }

        const body = { title, description, status, due_date }
        console.log(body) // optional for debugging

        const newTask = await createTask(body)

        if (!newTask) {
            setError("Couldn't create a new task. Try again later")
            return
        }

        navigate("/tasks")
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">New Task</h1>
            {validationError && <p className="text-red-500">{validationError}</p>}
            <TaskForm onSubmit={handleSubmit} />
        </div>
    )
}
