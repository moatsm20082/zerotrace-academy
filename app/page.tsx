import { Shell, PageTitle } from "@/components/ui";
import { BookOpen, Trophy, Brain, Shield } from "lucide-react";

export default function Page() {
  return (
    <Shell>
      <PageTitle
        badge="Core platform"
        title="ZeroTrace Academy is now ready for real Supabase integration."
        subtitle="This version includes real Auth wiring, profiles, labs from database, submissions, admin lab creation, tournament MVP tables, and AI Mentor placeholder."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 md:grid-cols-4">
        {[
          [BookOpen, "Labs from database", "Published labs load from Supabase."],
          [Shield, "Auth + Profiles", "Signup, login, reset, and profiles."],
          [Trophy, "Tournament MVP", "Challenges, participants, and submissions schema."],
          [Brain, "AI Mentor ready", "Safe UI ready for API/RAG later."]
        ].map(([Icon, title, text]: any) => (
          <div key={title} className="card p-6">
            <Icon className="h-7 w-7 text-cyan-300" />
            <h3 className="mt-4 text-xl font-black">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
