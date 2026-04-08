import RaceCard from "@/components/RaceCard";
import SeasonSelector from "@/components/SeasonSelector";

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
  const { season = "2024" } = await searchParams;
  const races = await getRaces(season);

  return (
    <main>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">{season} Race Calendar</h2>

        <SeasonSelector currentSeason={season} basePath="/" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {races.map((race: any) => (
          <RaceCard key={race.round} race={race} />
        ))}
      </div>
    </main>
  );
}
