import { useState, useEffect } from "react"
import StatsCard from "../components/StatsCard"
import RecentNotes from "../components/RecentNotes"
import RecentTasks from "../components/RecentTasks"
import { getDashboardData } from "../connections/dashboardApi"
import Error from "../components/Error"

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    const [recent, setRecent] = useState<RecentData | null>(null)

    useEffect(() => {
        setLoading(true)
        getDashboardData().then((data) => {
            if (!data) {
                setError("Couldn't load dashboard data")
                setLoading(false)
                return
            }
            setStats(data.stats)
            setRecent(data.recent)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    if (!stats || !recent) {
        return (
            <>
                <Error />
                <p>No dashboard data available</p>
            </>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard label="Total Notes" value={stats.total_notes} />
                <StatsCard label="Total Tasks" value={stats.total_tasks} />
                <StatsCard label="Completed" value={stats.completed_tasks} />
                <StatsCard label="Late" value={stats.late_tasks} />
            </div>

            <RecentNotes notes={recent.notes} />
            <RecentTasks tasks={recent.tasks} />
        </div>
    )
}
