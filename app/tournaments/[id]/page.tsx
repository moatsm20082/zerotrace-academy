"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";

export default function TournamentDetail({ params }: { params: { id: string } }) {
  const [t, setT] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: tour } = await supabase.from("tournaments").select("*").eq("id", params.id).single();
    setT(tour);
    const { data: ch } = await supabase.from("tournament_challenges").select("*").eq("tournament_id", params.id);
    setChallenges(ch || []);
  }

  if (!t) return <Shell><PageTitle badge="Tournament" title="Loading..." subtitle="Fetching tournament." /></Shell>;

  return (
    <Shell>
      <PageTitle badge="Live Cup" title={t.title} subtitle={t.prize || "ZeroTrace tournament"} />
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {challenges.length === 0 ? <EmptyBox title="No challenges yet" text="Seed tournament challenges in Supabase." /> : challenges.map(c => (
          <div key={c.id} className="card p-5">
            <span className="badge">{c.category}</span>
            <h3 className="mt-4 text-2xl font-black">{c.title}</h3>
            <p className="mt-2 text-slate-400">{c.objective}</p>
            <p className="mt-4 text-cyan-300">{c.points} pts · {c.difficulty}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
