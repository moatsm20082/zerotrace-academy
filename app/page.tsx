import { Shell, PageTitle } from "@/components/ui";
import { BookOpen, Trophy, Brain, Shield } from "lucide-react";

export default function Page() {
  const cards = [
    {
      title: "Labs from database",
      text: "Published labs load directly from Supabase.",
      icon: BookOpen,
    },
    {
      title: "Auth and profiles",
      text: "Signup, login, reset, and user profiles are prepared.",
      icon: Shield,
    },
    {
      title: "Tournament MVP",
      text: "Tournament pages and database tables are ready.",
      icon: Trophy,
    },
    {
      title: "AI Mentor ready",
      text: "Safe mentor interface is ready for API integration later.",
      icon: Brain,
    },
  ];

  return (
    <Shell>
      <PageTitle
        badge="Core platform"
        title="ZeroTrace Academy is ready for real Supabase integration."
        subtitle="Auth, profiles, labs, submissions, admin, tournaments, and AI Mentor are prepared for the live MVP."
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className="card p-6">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-4 text-xl font-black">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{card.text}</p>
            </div>
          );
        })}
      </section>
    </Shell>
  );
}
