import Link from "next/link";

const seasons = ["2023", "2024", "2025", "2026"];

type SeasonSelectorProps = {
  currentSeason: string;
  basePath: string;
};

export default function SeasonSelector({
  currentSeason,
  basePath,
}: SeasonSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {seasons.map((year) => {
        const isActive = year === currentSeason;

        return (
          <Link
            key={year}
            href={`${basePath}?season=${year}`}
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
  );
}
