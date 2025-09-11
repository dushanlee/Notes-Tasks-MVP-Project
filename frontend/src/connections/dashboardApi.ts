const BASE_URL = "http://localhost:8000/api"

export async function getDashboardData(): Promise<{ stats: DashboardStats; recent: DashboardRecent } | null> {
    try {
        const statsResponse = await fetch(`${BASE_URL}/dashboard/stats`)
        if (!statsResponse.ok) {
            throw new Error(`HTTP Error (stats): ${statsResponse.status}`)
        }
        const statsData = (await statsResponse.json()) as DashboardStats

        const recentResponse = await fetch(`${BASE_URL}/dashboard/recent`)
        if (!recentResponse.ok) {
            throw new Error(`HTTP Error (recent): ${recentResponse.status}`)
        }
        const recentData = (await recentResponse.json()) as DashboardRecent
        return { stats: statsData, recent: recentData }
    }
    catch (error) {
        console.error(error)
        return null
    }
}
