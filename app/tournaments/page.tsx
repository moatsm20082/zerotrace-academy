"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";
import { Trophy } from "lucide-react";

export default function TournamentsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("tournaments").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  }

  return (
    <Shell>
      <PageTitle badge="Tournament MVP" title="Tournament system connected to Supabase tables." subtitle="Create tournament rows in Supabase or extend Admin to manage them. This is ready for first MVP." />
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 md:grid-cols-3">
        {items.length === 0 ? <EmptyBox title="No tournaments yet" text="Run the seed SQL or create a tournament row in Supabase." /> : items.map(t => (
          <a href={`/tournaments/${t.id}`} key={t.id} className="card p-6">
            <Trophy className="h-7 w-7 text-yellow-300" />
            <h3 className="mt-4 text-2xl font-black">{t.title}</h3>
            <p className="mt-2 text-slate-400">{t.prize}</p>
            <p className="mt-4 text-cyan-300">{t.status}</p>
          </a>
        ))}
      </section>
    </Shell>
  );
}
