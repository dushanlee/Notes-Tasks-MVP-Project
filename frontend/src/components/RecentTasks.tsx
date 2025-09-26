import { Link } from 'react-router';

type Props = {
    tasks: Task[];
};

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
                {tasks.map(task => (
                    <li key={task.id}>
                        <Link
                            to={`/tasks/${task.id}`}
                            className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-1 hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                                <span className="font-semibold text-black text-base">
                                    {task.title}
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
                            </div>
                            <p className="text-sm text-gray-500 break-words mb-1">
                                {task.description}
                            </p>
                            {task.due_date && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Due:{' '}
                                    {new Date(
                                        task.due_date + 'Z'
                                    ).toLocaleDateString('en-US')}
                                </p>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
