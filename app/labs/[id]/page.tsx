"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle } from "@/components/ui";

export default function LabDetailPage({ params }: { params: { id: string } }) {
  const [lab, setLab] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("labs").select("*").eq("id", params.id).single();
    setLab(data);
  }

  async function submit() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setMessage("Login first.");
      return;
    }

    // MVP rule: correct when the answer exactly matches flag_plaintext if you temporarily store it.
    // Production rule: never expose plaintext flags; use secure server-side hash validation.
    const isCorrect = lab?.flag_plaintext ? answer.trim() === lab.flag_plaintext : false;

    const { error } = await supabase.from("submissions").insert({
      user_id: auth.user.id,
      lab_id: lab.id,
      answer,
      is_correct: isCorrect
    });

    if (error) return setMessage(error.message);
    setMessage(isCorrect ? "Correct. Submission saved." : "Wrong. Submission saved for review.");
  }

  if (!lab) return <Shell><PageTitle badge="Lab" title="Loading lab..." subtitle="Fetching lab from Supabase." /></Shell>;

  return (
    <Shell>
      <PageTitle badge={`${lab.category} · ${lab.difficulty}`} title={lab.title} subtitle={lab.description || ""} />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[1fr_.85fr]">
        <div className="grid gap-5">
          <div className="card p-6"><h2 className="text-2xl font-black">Objective</h2><p className="mt-3 text-slate-400">{lab.objective}</p></div>
          <div className="card p-6"><h2 className="text-2xl font-black">Defensive lesson</h2><p className="mt-3 text-slate-400">{lab.defensive_lesson}</p></div>
          <div className="card p-6"><h2 className="text-2xl font-black">Submit flag</h2><div className="mt-4 flex gap-3"><input className="input" placeholder="ZT{...}" value={answer} onChange={e => setAnswer(e.target.value)} /><button onClick={submit} className="btn-primary min-w-32">Submit</button></div>{message && <p className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">{message}</p>}</div>
        </div>
        <div className="grid gap-5">
          <div className="card p-6"><h2 className="text-2xl font-black">Evidence files</h2><p className="mt-3 text-slate-400">Storage upload is the next step. For now, link evidence in Admin description or objective.</p></div>
          <div className="card p-6"><h2 className="text-2xl font-black">Progressive hints</h2>{["Read the objective carefully.", "Identify the artifact type.", "Validate your answer format."].map((h, i) => <details key={h} className="mt-3 rounded-xl border border-white/10 bg-black/25 p-4"><summary>Hint {i+1}</summary><p className="mt-2 text-slate-400">{h}</p></details>)}</div>
        </div>
      </section>
    </Shell>
  );
}
