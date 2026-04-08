import SeasonSelector from "@/components/SeasonSelector";

async function getRaceWinners(season: string) {
  const res = await fetch(
    `https://api.jolpi.ca/ergast/f1/${season}/results/1.json?limit=100`,
  );

  const data = await res.json();

  return data.MRData.RaceTable.Races || [];
}

export default async function RacesPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season = "2024" } = await searchParams;
  const races = await getRaceWinners(season);

  return (
    <main>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Race Winners</h2>

        <SeasonSelector currentSeason={season} basePath="/races" />
      </div>

      <div className="space-y-4">
        {races.map((race: any) => {
          const winner = race.Results?.[0];

          const winnerName = winner
            ? `${winner.Driver?.givenName ?? ""} ${winner.Driver?.familyName ?? ""}`.trim()
            : "Winner not available";

          const winningTime = winner?.Time?.time || "Time not available";

          return (
            <div
              key={race.round}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-red-400 mb-1">
                    Round {race.round}
                  </p>

                  <h3 className="text-lg font-semibold">{race.raceName}</h3>

                  <p className="text-sm text-neutral-400">
                    {race.Circuit?.circuitName}
                  </p>

                  <p className="text-sm text-neutral-500">{race.date}</p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-neutral-400">Winner</p>

                  <p className="text-lg font-semibold">{winnerName}</p>

                  <p className="text-sm text-neutral-300 mt-1">{winningTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
