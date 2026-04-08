async function getDriverData(season: string, driverId: string) {
  const res = await fetch(
    `https://api.jolpi.ca/ergast/f1/${season}/drivers/${driverId}/driverstandings.json`,
  );

  const data = await res.json();

  return (
    data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings[0] || null
  );
}

export default async function DriverPage({
  params,
  searchParams,
}: {
  params: Promise<{ driverId: string }>;
  searchParams: Promise<{ season?: string }>;
}) {
  const { driverId } = await params;
  const { season = "2024" } = await searchParams;

  const driver = await getDriverData(season, driverId);

  if (!driver) {
    return (
      <main>
        <h2 className="text-2xl font-semibold mb-4">Driver Not Found</h2>

        <p className="text-neutral-400">
          No driver data is available for this season.
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-red-400 mb-2">{season} Driver Profile</p>

        <h2 className="text-3xl font-semibold mb-2">
          {driver.Driver.givenName} {driver.Driver.familyName}
        </h2>

        <p className="text-neutral-400 mb-6">{driver.Driver.nationality}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400 mb-1">Position</p>

            <p className="text-2xl font-semibold">#{driver.position}</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400 mb-1">Points</p>

            <p className="text-2xl font-semibold">{driver.points}</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400 mb-1">Wins</p>

            <p className="text-2xl font-semibold">{driver.wins}</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400 mb-1">Date of Birth</p>

            <p className="text-2xl font-semibold">
              {driver.Driver.dateOfBirth}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
