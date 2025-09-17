import { Link } from "react-router";
import type { Task } from "../vite-env";

type TaskCardProps = {
  task: Task;
  selected?: boolean;
  onSelect?: (checked: boolean) => void;
};

export default function TaskCard({ task, selected, onSelect }: TaskCardProps) {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    complete: "bg-green-100 text-green-700",
    late: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex items-start gap-2">
      {typeof selected === "boolean" && onSelect && (
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
          className="mt-1"
        />
      )}
      <Link
        to={`/tasks/${task.id}`}
        className="block flex-1 border-2 border-black/10 rounded-xl p-4 shadow bg-white/80 hover:bg-gray-100 transition text-left"
      >
        <h2 className="font-bold text-lg text-black mb-1">{task.title}</h2>
        <p className="text-sm text-gray-500 mb-2">{task.description}</p>

        <div className="flex items-center gap-1">
          {task.due_date && (
            <span className="text-xs text-gray-500">
              Due:{" "}
              {new Date(task.due_date + "Z").toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
              })}
            </span>
          )}
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

        <p className="text-xs text-gray-500">
          Created:{" "}
          {new Date(task.created_at).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
          })}
        </p>
      </Link>
    </div>
  );
}
