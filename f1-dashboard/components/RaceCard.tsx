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
  return (
    <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/40 transition">
      <h3 className="text-lg font-semibold">{race.raceName}</h3>

      <p className="text-sm text-neutral-400">{race.Circuit.circuitName}</p>

      <p className="text-sm text-neutral-500">
        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-neutral-400">{race.date}</span>

        <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400">
          Round {race.round}
        </span>
      </div>
    </div>
  );
}
