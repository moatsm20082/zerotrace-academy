"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";
import { Bug } from "lucide-react";

export default function LabsPage() {
  const [labs, setLabs] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("labs").select("*").eq("is_published", true).order("created_at", { ascending: false });
    setLabs(data || []);
  }

  const filtered = labs.filter(l => l.title.toLowerCase().includes(q.toLowerCase()) || l.category.toLowerCase().includes(q.toLowerCase()));

  return (
    <Shell>
      <PageTitle badge="Labs" title="Labs loaded from Supabase database." subtitle="Create labs in Admin, publish them, and they appear here for students." />
      <section className="mx-auto max-w-7xl px-5 pb-6"><input className="input" placeholder="Search labs..." value={q} onChange={e => setQ(e.target.value)} /></section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? <EmptyBox title="No labs yet" text="Go to Admin and create published labs." /> : filtered.map(lab => (
          <a href={`/labs/${lab.id}`} key={lab.id} className="card p-5 transition hover:border-cyan-400/40">
            <Bug className="h-7 w-7 text-cyan-300" />
            <div className="mt-4 flex gap-2"><span className="badge">{lab.category}</span><span className="badge">{lab.difficulty}</span></div>
            <h3 className="mt-4 text-2xl font-black">{lab.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{lab.description}</p>
            <p className="mt-4 text-cyan-300">{lab.points} XP</p>
          </a>
        ))}
      </section>
    </Shell>
  );
}
