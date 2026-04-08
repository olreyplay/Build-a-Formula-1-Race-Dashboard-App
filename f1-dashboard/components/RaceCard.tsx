type Race = {
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
};

export default function RaceCard({ race }: { race: Race }) {
  const formattedDate = new Date(race.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/40 transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{race.raceName}</h3>

        <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400">
          Round {race.round}
        </span>
      </div>

      <p className="text-sm text-neutral-400">{race.Circuit.circuitName}</p>

      <p className="text-sm text-neutral-500">
        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </p>

      <div className="mt-4">
        <span className="text-sm text-neutral-300">{formattedDate}</span>
      </div>
    </div>
  );
}
