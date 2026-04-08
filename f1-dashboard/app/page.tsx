async function getRaces() {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/2023.json");

  const data = await res.json();

  return data.MRData.RaceTable.Races;
}

export default async function Home() {
  const races = await getRaces();

  return (
    <main>
      <h2 className="text-2xl font-bold mb-6">Race Calendar</h2>

      <div className="grid gap-4">
        {races.map((race: any) => (
          <div key={race.round} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{race.raceName}</h3>

            <p className="text-sm text-gray-600">{race.Circuit.circuitName}</p>

            <p className="text-sm">{race.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
