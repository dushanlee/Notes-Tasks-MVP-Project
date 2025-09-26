import { useState } from 'react';
import { useNavigate } from 'react-router';
import TaskForm from '../components/TaskForm';
import { createTask } from '../connections/taskApi';

export default function CreateTask() {
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(
        title: string,
        description: string,
        status: string,
        due_date: string | null
    ) {
        if (!title) {
            setValidationError('Title is required');
            return;
        }
        const body = { title, description, status, due_date };
        const newTask = await createTask(body);
        if (!newTask) {
            setError("Couldn't create a new task. Try again later");
            return;
        }
        navigate('/tasks');
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex w-full h-full flex-1 bg-white rounded-xl">
            <div className="w-full space-y-6 px-4 md:px-8 border-2 border-black/10 dark:border-gray-700 rounded-xl shadow bg-white/70 dark:bg-gray-800 flex flex-col pt-8">
                <h1 className="text-2xl font-bold text-black dark:text-white text-center w-full mb-4">
                    New Task
                </h1>
                {validationError && (
                    <p className="text-red-500">{validationError}</p>
                )}
                <TaskForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
