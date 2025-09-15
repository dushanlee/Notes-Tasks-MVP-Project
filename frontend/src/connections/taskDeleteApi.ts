import type { Task } from "../vite-env"

export async function deleteTasksBulk(ids: number[]): Promise<boolean> {
    try {
        const results = await Promise.all(ids.map(id => fetch(`http://localhost:8000/api/tasks/${id}`, { method: "DELETE" })));
        return results.every(res => res.ok);
    } catch (error) {
        console.error(error);
        return false;
    }
}
