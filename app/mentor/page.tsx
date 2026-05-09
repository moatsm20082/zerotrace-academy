"use client";

import { useState } from "react";
import { Shell, PageTitle } from "@/components/ui";
import { Brain, CheckCircle2 } from "lucide-react";

export default function MentorPage() {
  const [messages, setMessages] = useState<string[]>([
    "Tell me what you tried first. I will guide you without revealing the flag."
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    setMessages([...messages, input, "MVP mentor response: I can give a staged hint. Check the file type, then inspect the most relevant field. I will not reveal the flag directly."]);
    setInput("");
  }

  return (
    <Shell>
      <PageTitle badge="AI Mentor MVP" title="Safe AI Mentor placeholder" subtitle="This is ready for OpenAI/RAG later. For now it shows the correct behavior and rules." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[1fr_.8fr]">
        <div className="card p-6">
          <div className="grid gap-3">
            {messages.map((m, i) => <div key={i} className="rounded-xl border border-white/10 bg-black/25 p-4">{m}</div>)}
          </div>
          <div className="mt-4 flex gap-3"><input className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="What did you try?" /><button className="btn-primary" onClick={send}>Send</button></div>
        </div>
        <div className="card p-6">
          <Brain className="h-8 w-8 text-cyan-300" />
          <h2 className="mt-4 text-2xl font-black">Mentor rules</h2>
          {["Never reveal flags directly", "Ask for effort first", "Use progressive hints", "Explain mistakes", "Support Arabic/English later", "Use lab context through RAG later"].map(r => <p key={r} className="mt-3"><CheckCircle2 className="mr-2 inline text-emerald-300" />{r}</p>)}
        </div>
      </section>
    </Shell>
  );
}
