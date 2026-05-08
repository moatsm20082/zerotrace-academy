"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, Terminal, Trophy, BookOpen, Bug, CheckCircle2, Mail,
  ChevronRight, Menu, X, Crown, Video, Brain, FileText, Upload,
  CreditCard, Bot, Lock, Globe2, Settings, AlertTriangle
} from "lucide-react";
import { paths, labs, rooms, features, leaderboard, adminCards, securityEvents } from "@/lib/data";

function Badge({ children, tone = "cyan" }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    yellow: "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
    red: "border-red-400/30 bg-red-400/10 text-red-200",
    purple: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone] || tones.cyan}`}>{children}</span>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 shadow-glow">
        <Shield className="h-6 w-6 text-cyan-300" />
      </div>
      <div>
        <div className="tracking-[0.22em] text-sm font-black text-white">ZEROTRACE</div>
        <div className="text-[10px] font-bold tracking-[0.5em] text-cyan-300">ACADEMY</div>
      </div>
    </div>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Courses", "Rooms", "Labs", "AI Mentor", "Tournaments", "Pricing", "Admin"];
  return (
    <header className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {links.map((item) => <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="transition hover:text-cyan-300">{item}</a>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="/auth" className="rounded-xl border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400/50">Log in</a>
          <a href="/auth" className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2 text-sm font-black text-black shadow-glow">Sign Up</a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="grid gap-3 text-slate-300">
            {links.map((item) => <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>{item}</a>)}
            <a href="/auth" className="rounded-xl bg-cyan-400 px-5 py-2 text-center font-black text-black">Sign Up</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Page() {
  const [activeView, setActiveView] = useState("student");
  const totalLabs = useMemo(() => paths.reduce((sum, p) => sum + p.labs, 0), []);

  return (
    <div className="min-h-screen overflow-hidden cyber-bg text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-70 grid-overlay" />
      <Nav />

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge tone="green">Ethical labs only · AI-guided · Arabic/English ready</Badge>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Train Like an <span className="text-cyan-300">Attacker.</span><br />Defend Like a <span className="text-emerald-300">Pro.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A serious cybersecurity academy with rooms, labs, downloadable evidence, AI mentor, reports, tournaments, subscriptions, skill tree, and admin control.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="/auth" className="group rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-7 py-4 text-center font-black text-black shadow-glow">
                Start Learning <ChevronRight className="ml-2 inline h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a href="#tournaments" className="rounded-2xl border border-cyan-400/40 px-7 py-4 text-center font-bold text-cyan-100 hover:bg-cyan-400/10">
                Explore Weekly Cup
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[[BookOpen, "400+ Labs", "All major domains"], [Brain, "AI Mentor", "Hints without burning flags"], [FileText, "Reports", "Real work output"]].map(([Icon, title, desc]: any) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <div className="mt-3 font-bold text-white">{title}</div>
                  <div className="text-sm text-slate-400">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(16,185,129,0.06),rgba(124,58,237,0.08))] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Student dashboard</p>
                    <h3 className="text-2xl font-black">Level 12 Defender</h3>
                  </div>
                  <Badge tone="cyan">75% complete</Badge>
                </div>
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {[["XP", "12,450"], ["Solved", "87"], ["Rank", "#143"]].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="mt-1 text-2xl font-black text-white">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-bold">Recommended next steps</h4>
                    <Terminal className="h-5 w-5 text-emerald-300" />
                  </div>
                  {["Cybersecurity terms", "Linux terminal", "Networking and HTTP", "Web vulnerabilities", "CTF solving method"].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 border-t border-white/10 py-3 first:border-t-0">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-400/10 text-xs font-black text-cyan-300">{i + 1}</div>
                      <p className="text-sm text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl px-5 py-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge tone="cyan">Learning paths</Badge>
              <h2 className="mt-4 text-3xl font-black md:text-4xl">A roadmap that teaches, not just throws labs at people.</h2>
              <p className="mt-3 max-w-2xl text-slate-400">Arabic/English training, skill tree, career mode, rooms, reports, and AI guidance.</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
              Planned content: <span className="font-black text-white">{totalLabs}+ labs</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <div key={path.title} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.055]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Icon /></div>
                    <Badge tone={path.level === "Advanced" ? "purple" : path.level === "Professional" ? "green" : "cyan"}>{path.level}</Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{path.title}</h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">{path.description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-slate-400">{path.lessons} lessons · {path.labs} labs</span>
                    <ChevronRight className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="rooms" className="mx-auto max-w-7xl px-5 py-10">
          <Badge tone="purple">Rooms</Badge>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">Rooms are complete training cases, not random flags.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <div key={room.name} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <Badge tone="cyan">{room.category}</Badge>
                  <Badge tone={room.level === "Beginner" ? "green" : room.level === "Medium" ? "yellow" : "red"}>{room.level}</Badge>
                </div>
                <h3 className="mt-4 text-xl font-black">{room.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{room.focus}</p>
                <div className="mt-4 text-sm text-cyan-200">{room.labs} labs · {room.files}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="labs" className="mx-auto grid max-w-7xl gap-6 px-5 py-10 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <Badge tone="green">Featured labs</Badge>
                <h2 className="mt-3 text-3xl font-black">Practice with downloadable evidence.</h2>
              </div>
              <a href="/labs" className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 md:block">View all labs</a>
            </div>
            <div className="grid gap-4">
              {labs.map((lab) => (
                <div key={lab.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Bug /></div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black">{lab.title}</h3>
                          <Badge tone={lab.difficulty === "Easy" ? "green" : lab.difficulty === "Medium" ? "yellow" : "red"}>{lab.difficulty}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-cyan-300">{lab.room} · {lab.points} XP</p>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{lab.description}</p>
                      </div>
                    </div>
                    <div className="min-w-44">
                      <div className="mb-2 flex justify-between text-xs text-slate-400"><span>Stage</span><span>{lab.stage}</span></div>
                      <button className="mt-4 w-full rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-bold text-cyan-200 hover:bg-cyan-400/10"><Upload className="mr-2 inline h-4 w-4" />Download Files</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div id="tournaments" className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-violet-500/10 p-6">
              <Badge tone="purple">Weekly tournament</Badge>
              <h2 className="mt-4 text-3xl font-black">ZeroTrace Weekly Cup</h2>
              <p className="mt-2 text-slate-400">Live competition system with dynamic flags, attempts limit, scoreboard freeze, and anti-cheat logs.</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[["Prize", "$500+"], ["Players", "1,248"], ["Starts", "2d 14h"]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-slate-400">{k}</p><p className="mt-1 font-black text-white">{v}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-4 font-black text-black"><Trophy className="mr-2 inline h-5 w-5" />Join Tournament</button>
            </div>

            <div id="pricing" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">Subscriptions</h2>
                <CreditCard className="text-cyan-300" />
              </div>
              {[["Free", "Beginner rooms + public tournaments"], ["Pro", "All labs + AI mentor + certificates"], ["Team", "Private tournaments + reports + team dashboard"]].map(([plan, desc]) => (
                <div key={plan} className="mb-3 rounded-2xl border border-white/10 bg-black/25 p-4 last:mb-0">
                  <div className="font-black">{plan}</div>
                  <div className="text-sm text-slate-400">{desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">Leaderboard</h2>
                <Crown className="text-yellow-300" />
              </div>
              <div className="space-y-3">
                {leaderboard.map(([name, xp], idx) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-black">{idx + 1}</div>
                      <span className="font-semibold text-slate-200">{name}</span>
                    </div>
                    <span className="font-black text-emerald-300">{xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ai-mentor" className="mx-auto max-w-7xl px-5 py-10">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.045] p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Badge tone="green">AI Mentor</Badge>
                <h2 className="mt-4 text-3xl font-black">Guidance without leaking flags.</h2>
                <p className="mt-3 text-slate-400">The mentor asks what the student tried, explains mistakes, gives staged hints, and uses lab knowledge without direct flag leaks.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="mb-3 text-sm font-black text-cyan-300">Mentor behavior</div>
                {["Ask what the student tried", "Give hint level 1/2/3", "Explain wrong answers", "Require effort before walkthrough", "Support Arabic and English"].map((x) => (
                  <div key={x} className="flex items-center gap-3 border-t border-white/10 py-3 first:border-t-0">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm text-slate-300">{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="admin" className="mx-auto max-w-7xl px-5 py-10">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <Badge tone="red">Admin room</Badge>
                <h2 className="mt-4 text-3xl font-black">Lab builder, users, submissions, reports, payments, and logs.</h2>
                <p className="mt-3 max-w-3xl text-slate-400">Admin tracks accounts, labs, files, reports, subscriptions, failed logins, suspicious behavior, and maintenance mode legally. No passwords shown.</p>
              </div>
              <div className="flex rounded-2xl border border-white/10 bg-black/25 p-1">
                <button onClick={() => setActiveView("student")} className={`rounded-xl px-4 py-2 text-sm font-bold ${activeView === "student" ? "bg-cyan-400 text-black" : "text-slate-300"}`}>Student</button>
                <button onClick={() => setActiveView("admin")} className={`rounded-xl px-4 py-2 text-sm font-bold ${activeView === "admin" ? "bg-emerald-400 text-black" : "text-slate-300"}`}>Admin</button>
              </div>
            </div>

            {activeView === "admin" ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {adminCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                        <Icon className="h-6 w-6 text-cyan-300" />
                        <p className="mt-3 text-sm text-slate-400">{card.title}</p>
                        <p className="mt-1 text-3xl font-black">{card.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <h3 className="text-xl font-black">Security activity log</h3>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                    {securityEvents.map(([event, actor, status, time]) => (
                      <div key={event} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] gap-3 border-b border-white/10 px-4 py-3 text-sm last:border-b-0">
                        <span className="text-slate-200">{event}</span>
                        <span className="text-slate-400">{actor}</span>
                        <span className={status === "Success" ? "text-emerald-300" : status === "Blocked" ? "text-red-300" : "text-yellow-300"}>{status}</span>
                        <span className="text-slate-500">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <Icon className="h-6 w-6 text-emerald-300" />
                      <h3 className="mt-4 font-black">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-10 border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">Build ethical cybersecurity skills through guided paths, legal labs, AI mentor, reports, subscriptions, and competitive tournaments.</p>
            <div className="mt-6 flex max-w-md gap-2">
              <input className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-cyan-400" placeholder="Enter your email" />
              <button className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-black"><Mail className="h-4 w-4" /></button>
            </div>
          </div>
          {[["Platform", "Courses", "Labs", "AI Mentor", "Tournaments"], ["Company", "About", "Pricing", "Careers", "Contact"], ["Legal", "Terms", "Privacy", "Refunds", "Responsible Use"]].map((col) => (
            <div key={col[0]}>
              <h4 className="font-black text-white">{col[0]}</h4>
              <div className="mt-4 grid gap-3 text-sm text-slate-400">{col.slice(1).map((link) => <a key={link} className="hover:text-cyan-300">{link}</a>)}</div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
