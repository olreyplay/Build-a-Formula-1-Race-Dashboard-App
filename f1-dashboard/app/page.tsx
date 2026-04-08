import RaceCard from "@/components/RaceCard";

async function getRaces() {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/2023.json");

  const data = await res.json();

  return data.MRData.RaceTable.Races;
}

export default async function Home() {
  const races = await getRaces();

  return (
    <main>
      <h2 className="text-2xl font-semibold mb-6">Race Calendar</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {races.map((race: any) => (
          <RaceCard key={race.round} race={race} />
        ))}
      </div>
    </main>
  );
}
