import type { StatCardProps } from "../vite-env";
export default function StatsCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white/70 rounded-xl shadow p-4 text-center border-2 border-black/10 transition">
      <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
}
