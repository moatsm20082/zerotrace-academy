"use client";

import React from "react";
import { Shield } from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen cyber-bg text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-70 grid-overlay" />
      <header className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 shadow-glow">
              <Shield className="h-6 w-6 text-cyan-300" />
            </div>
            <div>
              <div className="tracking-[0.22em] text-sm font-black text-white">ZEROTRACE</div>
              <div className="text-[10px] font-bold tracking-[0.5em] text-cyan-300">ACADEMY</div>
            </div>
          </a>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="/dashboard" className="hover:text-cyan-300">Dashboard</a>
            <a href="/labs" className="hover:text-cyan-300">Labs</a>
            <a href="/tournaments" className="hover:text-cyan-300">Tournaments</a>
            <a href="/mentor" className="hover:text-cyan-300">AI Mentor</a>
            <a href="/admin" className="hover:text-cyan-300">Admin</a>
          </nav>
          <a href="/auth" className="btn-primary text-sm">Login</a>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function PageTitle({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <Badge>{badge}</Badge>
      <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">{subtitle}</p>
    </section>
  );
}

export function EmptyBox({ title, text }: { title: string; text: string }) {
  return <div className="card p-8 text-center"><h3 className="text-2xl font-black">{title}</h3><p className="mt-2 text-slate-400">{text}</p></div>
}
