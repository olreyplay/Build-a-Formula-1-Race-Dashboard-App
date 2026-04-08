import Link from "next/link";

async function getDriverStandings(season: string) {
  const res = await fetch(
    `https://api.jolpi.ca/ergast/f1/${season}/driverstandings.json`,
  );

  const data = await res.json();

  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
}

const seasons = ["2023", "2024", "2025", "2026"];

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season = "2024" } = await searchParams;
  const standings = await getDriverStandings(season);

  return (
    <main>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Driver Standings</h2>

        <div className="flex flex-wrap gap-2">
          {seasons.map((year) => {
            const isActive = year === season;

            return (
              <Link
                key={year}
                href={`/standings?season=${year}`}
                className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                  isActive
                    ? "bg-red-500 text-white border-red-500"
                    : "border-neutral-700 text-neutral-300 hover:border-red-500/40 hover:text-white"
                }`}
              >
                {year}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {standings.map((driver: any) => (
          <div
            key={driver.position}
            className="p-4 rounded-xl bg-neutral-900 border border-neutral-800"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-red-400 mb-1">#{driver.position}</p>

                <h3 className="text-lg font-semibold">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </h3>

                <p className="text-sm text-neutral-400">
                  {driver.Constructors[0].name}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">{driver.points}</p>

                <p className="text-sm text-neutral-500">pts</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
