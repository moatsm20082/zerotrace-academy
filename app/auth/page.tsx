"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shell, PageTitle } from "@/components/ui";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [tryhackme, setTryhackme] = useState("");
  const [picoctf, setPicoctf] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    setMessage("Creating account...");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setMessage(error.message);

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        username,
        tryhackme_username: tryhackme,
        picoctf_username: picoctf,
        role: "student"
      });
    }
    setMessage("Account created. Check your email if verification is enabled.");
  }

  async function login() {
    setMessage("Logging in...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage(error.message);
    window.location.href = "/dashboard";
  }

  async function reset() {
    setMessage("Sending reset email...");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`
    });
    if (error) return setMessage(error.message);
    setMessage("Password reset email sent.");
  }

  return (
    <Shell>
      <PageTitle badge="Auth" title="Real Supabase Auth" subtitle="Signup, login, profile creation, and password reset are wired to Supabase." />
      <section className="mx-auto max-w-xl px-5 pb-12">
        <div className="card p-6">
          <div className="mb-5 flex gap-2">
            <button onClick={() => setMode("login")} className={mode === "login" ? "btn-primary" : "btn-ghost"}>Login</button>
            <button onClick={() => setMode("signup")} className={mode === "signup" ? "btn-primary" : "btn-ghost"}>Signup</button>
            <button onClick={() => setMode("reset")} className={mode === "reset" ? "btn-primary" : "btn-ghost"}>Reset</button>
          </div>

          {mode === "signup" && (
            <div className="grid gap-3">
              <input className="input" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} />
              <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <input className="input" placeholder="TryHackMe username" value={tryhackme} onChange={e => setTryhackme(e.target.value)} />
              <input className="input" placeholder="picoCTF username" value={picoctf} onChange={e => setPicoctf(e.target.value)} />
            </div>
          )}

          <div className="mt-3 grid gap-3">
            <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            {mode !== "reset" && <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />}
            <button className="btn-primary" onClick={mode === "login" ? login : mode === "signup" ? signUp : reset}>
              {mode === "login" ? "Login" : mode === "signup" ? "Create account" : "Send reset email"}
            </button>
          </div>

          {message && <p className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-cyan-100">{message}</p>}
        </div>
      </section>
    </Shell>
  );
}
