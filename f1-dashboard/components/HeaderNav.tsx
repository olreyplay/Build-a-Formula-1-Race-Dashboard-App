"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HeaderNav() {
  const searchParams = useSearchParams();
  const season = searchParams.get("season") || "2024";

  return (
    <nav className="flex gap-6 text-sm text-neutral-300">
      <Link href={`/?season=${season}`} className="hover:text-white transition">
        Home
      </Link>

      <Link
        href={`/standings?season=${season}`}
        className="hover:text-white transition"
      >
        Standings
      </Link>

      <Link
        href={`/races?season=${season}`}
        className="hover:text-white transition"
      >
        Races
      </Link>
    </nav>
  );
}
