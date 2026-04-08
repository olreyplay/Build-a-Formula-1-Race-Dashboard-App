import Link from "next/link";
import RaceCard from "@/components/RaceCard";

async function getRaces(season: string) {
  const res = await fetch(`https://api.jolpi.ca/ergast/f1/${season}.json`);

  const data = await res.json();

  return data.MRData.RaceTable.Races;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season = "2023" } = await searchParams;
  const races = await getRaces(season);

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">{season} Race Calendar</h2>

        <div className="flex gap-2">
          <Link
            href="/?season=2023"
            className="px-3 py-1.5 rounded-lg border border-neutral-700 text-sm hover:border-red-500/40 hover:text-white transition"
          >
            2023
          </Link>
          <Link
            href="/?season=2024"
            className="px-3 py-1.5 rounded-lg border border-neutral-700 text-sm hover:border-red-500/40 hover:text-white transition"
          >
            2024
          </Link>
          <Link
            href="/?season=2025"
            className="px-3 py-1.5 rounded-lg border border-neutral-700 text-sm hover:border-red-500/40 hover:text-white transition"
          >
            2025
          </Link>
          <Link
            href="/?season=2026"
            className="px-3 py-1.5 rounded-lg border border-neutral-700 text-sm hover:border-red-500/40 hover:text-white transition"
          >
            2026
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {races.map((race: any) => (
          <RaceCard key={race.round} race={race} />
        ))}
      </div>
    </main>
  );
}
