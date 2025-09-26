import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { getTaskById, deleteTask } from '../connections/taskApi';

export default function TaskDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getTaskById(Number(id)).then(data => {
                if (!data) setError("Couldn't load task");
                else setTask(data);
            });
        }
    }, [id]);

    async function handleDelete() {
        if (task && confirm('Are you sure you want to delete this task?')) {
            const success = await deleteTask(task.id);
            if (success) navigate('/tasks');
            else setError('Failed to delete task');
        }
    }

    if (error) return <p className="text-red-500">{error}</p>;
    if (!task) return <p>Loading...</p>;

    return (
        <div className="flex w-full h-full flex-1 bg-white rounded-xl">
            <div className="w-full space-y-6 px-4 md:px-8 border-2 border-black/10 dark:border-gray-700 rounded-xl shadow bg-white/70 dark:bg-gray-800 flex flex-col pt-8">
                <div className="flex items-center justify-between w-full mb-8 relative">
                    <Link
                        to="/tasks"
                        className="absolute left-0 px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white border-2 border-black/10 dark:border-gray-700 rounded-xl shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold flex items-center whitespace-nowrap"
                    >
                        <span className="mr-2">&#8592;</span> Back to Tasks
                    </Link>
                    <h1 className="text-2xl font-bold text-black text-center w-full">
                        <span className="text-2xl font-bold text-black dark:text-white text-center w-full">
                            {task.title}
                        </span>
                    </h1>
                    <div className="flex gap-2 ml-0 mt-[-12px] mr-[-12px]">
                        <Link
                            to={`/tasks/${task.id}/edit`}
                            className="inline-block px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white border-2 border-black/10 dark:border-gray-700 rounded-xl shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold items-center whitespace-nowrap"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-block px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white border-2 border-black/10 dark:border-gray-700 rounded-xl shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <p className="text-base text-black mb-3 text-left">
                    <span className="text-base text-black dark:text-white mb-3 text-left">
                        {task.description}
                    </span>
                </p>
                <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Status:
                        </span>
                        <span
                            className={`text-xs px-2 py-1 rounded ${
                                task.status === 'complete'
                                    ? 'bg-green-100 text-green-700'
                                    : task.status === 'late'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                            {task.status}
                        </span>
                        {task.due_date && (
                            <span className="text-xs text-gray-500">
                                | Due:{' '}
                                {new Date(task.due_date).toLocaleString(
                                    'en-US',
                                    {
                                        timeZone: 'America/Los_Angeles',
                                    }
                                )}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                        Created:{' '}
                        {new Date(task.created_at).toLocaleString('en-US', {
                            timeZone: 'America/Los_Angeles',
                        })}
                    </p>
                    {task.updated_at && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                            Updated:{' '}
                            {new Date(task.updated_at).toLocaleString('en-US', {
                                timeZone: 'America/Los_Angeles',
                            })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
