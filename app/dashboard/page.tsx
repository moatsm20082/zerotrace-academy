"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";
import { Award, Flag, Gauge, Trophy } from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      window.location.href = "/auth";
      return;
    }
    const { data: prof } = await supabase.from("profiles").select("*").eq("id", auth.user.id).single();
    setProfile(prof);
    const { data: submissions } = await supabase.from("submissions").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false });
    setSubs(submissions || []);
    setLoading(false);
  }

  if (loading) return <Shell><PageTitle badge="Dashboard" title="Loading..." subtitle="Checking your session." /></Shell>;

  return (
    <Shell>
      <PageTitle badge="Dashboard" title={`Welcome ${profile?.username || "student"}`} subtitle="Your real submissions, XP, progress, and lab history will appear here." />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-4">
        {[[Gauge, "XP", profile?.xp || 0], [Flag, "Submissions", subs.length], [Award, "Correct", subs.filter(s => s.is_correct).length], [Trophy, "Rank", "Beta"]].map(([Icon, label, value]: any) => (
          <div key={label} className="card p-6"><Icon className="h-7 w-7 text-cyan-300" /><p className="mt-3 text-sm text-slate-400">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Recent submissions</h2>
          {subs.length === 0 ? <EmptyBox title="No submissions yet" text="Open a lab and submit your first flag." /> : (
            <div className="mt-4 grid gap-3">{subs.map(s => <div key={s.id} className="rounded-xl border border-white/10 bg-black/25 p-4"><b>{s.lab_id}</b><span className={s.is_correct ? "ml-3 text-emerald-300" : "ml-3 text-red-300"}>{s.is_correct ? "Correct" : "Wrong"}</span><p className="text-sm text-slate-500">{s.created_at}</p></div>)}</div>
          )}
        </div>
      </section>
    </Shell>
  );
}
