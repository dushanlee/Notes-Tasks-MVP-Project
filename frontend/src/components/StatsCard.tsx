export default function StatsCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-black">{value}</p>
        </div>
    )
}
