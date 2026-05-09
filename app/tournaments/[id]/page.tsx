"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";

export default function TournamentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [tournamentId, setTournamentId] = useState<string>("");
  const [tournament, setTournament] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [message, setMessage] = useState("Fetching tournament.");

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setTournamentId(resolved.id);
    }

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (tournamentId) {
      load();
    }
  }, [tournamentId]);

  async function load() {
    const { data: tour, error: tourError } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", tournamentId)
      .single();

    if (tourError) {
      setMessage(tourError.message);
      return;
    }

    setTournament(tour);

    const { data: ch, error: challengesError } = await supabase
      .from("tournament_challenges")
      .select("*")
      .eq("tournament_id", tournamentId);

    if (challengesError) {
      setMessage(challengesError.message);
      return;
    }

    setChallenges(ch || []);
  }

  if (!tournament) {
    return (
      <Shell>
        <PageTitle badge="Tournament" title="Loading..." subtitle={message} />
      </Shell>
    );
  }

  return (
    <Shell>
      <PageTitle
        badge="Live Cup"
        title={tournament.title}
        subtitle={tournament.prize || "ZeroTrace tournament"}
      />

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {challenges.length === 0 ? (
          <EmptyBox
            title="No challenges yet"
            text="Seed tournament challenges in Supabase."
          />
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="card p-5">
              <span className="badge">{challenge.category}</span>
              <h3 className="mt-4 text-2xl font-black">{challenge.title}</h3>
              <p className="mt-2 text-slate-400">{challenge.objective}</p>
              <p className="mt-4 text-cyan-300">
                {challenge.points} pts · {challenge.difficulty}
              </p>
            </div>
          ))
        )}
      </section>
    </Shell>
  );
}
