"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle, EmptyBox } from "@/components/ui";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [labs, setLabs] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "", category: "Web", difficulty: "Easy", points: "100",
    description: "", objective: "", defensive_lesson: "", flag_plaintext: "", is_published: true
  });
  const [message, setMessage] = useState("");

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      window.location.href = "/auth";
      return;
    }
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", auth.user.id).single();
    if (profile?.role !== "admin") {
      setChecking(false);
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
    setChecking(false);
    load();
  }

  async function load() {
    const { data: l } = await supabase.from("labs").select("*").order("created_at", { ascending: false });
    setLabs(l || []);
    const { data: s } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
    setSubs(s || []);
  }

  async function createLab() {
    setMessage("Creating lab...");
    const { error } = await supabase.from("labs").insert({
      title: form.title,
      category: form.category,
      difficulty: form.difficulty,
      points: Number(form.points),
      description: form.description,
      objective: form.objective,
      defensive_lesson: form.defensive_lesson,
      flag_plaintext: form.flag_plaintext,
      is_published: form.is_published
    });
    if (error) return setMessage(error.message);
    setMessage("Lab created.");
    setForm({ ...form, title: "", description: "", objective: "", defensive_lesson: "", flag_plaintext: "" });
    load();
  }

  if (checking) return <Shell><PageTitle badge="Admin" title="Checking admin access..." subtitle="Verifying role." /></Shell>;
  if (!isAdmin) return <Shell><PageTitle badge="Admin" title="Access denied" subtitle="Your profile role must be admin. Change your role in Supabase profiles table." /></Shell>;

  return (
    <Shell>
      <PageTitle badge="Admin" title="Admin Control Center" subtitle="Create labs, publish labs, and view all user submissions." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Lab Builder</h2>
          <div className="mt-4 grid gap-3">
            <input className="input" placeholder="Lab title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Web</option><option>Forensics</option><option>Crypto</option><option>Network</option><option>Reverse</option><option>OSINT</option><option>Blue Team</option><option>Cloud</option></select>
            <select className="input" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option><option>Expert</option></select>
            <input className="input" placeholder="Points" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} />
            <textarea className="input min-h-24" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <textarea className="input min-h-24" placeholder="Objective" value={form.objective} onChange={e => setForm({ ...form, objective: e.target.value })} />
            <textarea className="input min-h-24" placeholder="Defensive lesson" value={form.defensive_lesson} onChange={e => setForm({ ...form, defensive_lesson: e.target.value })} />
            <input className="input" placeholder="MVP flag plaintext, example ZT{demo_flag}" value={form.flag_plaintext} onChange={e => setForm({ ...form, flag_plaintext: e.target.value })} />
            <button className="btn-primary" onClick={createLab}>Create lab</button>
            {message && <p className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm">{message}</p>}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="card p-6">
            <h2 className="text-2xl font-black">Labs</h2>
            {labs.length === 0 ? <EmptyBox title="No labs" text="Create your first lab." /> : <div className="mt-4 grid gap-3">{labs.map(l => <div key={l.id} className="rounded-xl border border-white/10 bg-black/25 p-4"><b>{l.title}</b><p className="text-sm text-slate-400">{l.category} · {l.difficulty} · {l.points} XP · {l.is_published ? "Published" : "Draft"}</p></div>)}</div>}
          </div>
          <div className="card p-6">
            <h2 className="text-2xl font-black">Submissions</h2>
            {subs.length === 0 ? <EmptyBox title="No submissions" text="Student answers will appear here." /> : <div className="mt-4 grid gap-3">{subs.map(s => <div key={s.id} className="rounded-xl border border-white/10 bg-black/25 p-4"><b>{s.answer}</b><p className={s.is_correct ? "text-emerald-300" : "text-red-300"}>{s.is_correct ? "Correct" : "Wrong"}</p><p className="text-xs text-slate-500">{s.user_id} · {s.lab_id}</p></div>)}</div>}
          </div>
        </div>
      </section>
    </Shell>
  );
}
