import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import StatsCard from "../components/StatsCard"
import RecentNotes from "../components/RecentNotes"
import RecentTasks from "../components/RecentTasks"
import { getDashboardData } from "../connections/dashboardApi"
import Error from "../components/Error"
import type { RecentData, Stats } from "../vite-env"

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    const [recent, setRecent] = useState<RecentData | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            setLoading(true);
            getDashboardData().then((data) => {
                if (!isMounted) return;
                if (!data) {
                    setError("Couldn't load dashboard data");
                    setLoading(false);
                    return;
                }
                setStats(data.stats);
                setRecent(data.recent);
                setLoading(false);
            });
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); // 60 seconds
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!stats || !recent) {
        return (
            <>
                <Error />
                <p>No dashboard data available</p>
            </>
        );
    }

    return (
        <div className="flex justify-center w-full h-full flex-1">
            <div className="w-full max-w-7xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex-1 flex flex-col">
                <div className="flex flex-col items-center w-full pt-8 mb-8">
                    <h1 className="text-2xl font-bold text-black text-center w-full">Dashboard</h1>
                </div>

                {/* Action buttons row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button
                        className="w-full bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10"
                        onClick={() => navigate("/notes/new")}
                    >
                        + New Note
                    </button>
                    <button
                        className="w-full bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10"
                        onClick={() => navigate("/tasks/new")}
                    >
                        + New Task
                    </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatsCard label={<><span role="img" aria-label="note">📝</span> Total Notes</>} value={stats.total_notes} />
                    <StatsCard label={<><span role="img" aria-label="check">✅</span> Completed Tasks</>} value={stats.completed_tasks} />
                    <StatsCard label={<><span role="img" aria-label="working">💼</span> Pending Tasks</>} value={stats.pending_tasks} />
                    <StatsCard label={<><span role="img" aria-label="late">📅</span> Late Tasks</>} value={stats.late_tasks} />
                </div>

                {/* Recent notes and tasks side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <RecentNotes notes={recent.notes} />
                    </div>
                    <div>
                        <RecentTasks tasks={recent.tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
