import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTaskById, updateTask } from "../connections/taskApi";
import TaskForm from "../components/TaskForm";
import type { Task } from "../vite-env";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getTaskById(Number(id)).then((data) => {
        if (!data) setError("Couldn't load task");
        else setTask(data);
      });
    }
  }, [id]);

  async function handleSubmit(
    title: string,
    description: string,
    status: string,
    due_date: string | null
  ) {
    if (!id) return;
    const updated = await updateTask(Number(id), {
      title,
      description,
      status,
      due_date,
    });
    if (updated) navigate(`/tasks/${id}`);
    else setError("Failed to update task");
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <div className="flex w-full h-full flex-1">
      <div className="w-full flex-1 space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex flex-col pt-8">
        <h1 className="text-2xl font-bold text-black text-center w-full mb-4">
          Edit Task
        </h1>
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          initialStatus={task.status}
          initialDueDate={task.due_date ?? ""}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
