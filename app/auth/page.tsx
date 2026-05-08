export default function AuthPage() {
  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-16 text-white">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200 w-max">Auth</div>
        <h1 className="mt-4 text-4xl font-black">Login / Sign up</h1>
        <p className="mt-3 text-slate-400">Supabase Auth integration goes here: email verification, forgot password, profile creation, and TryHackMe username.</p>
        <div className="mt-6 grid gap-3">
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Email" />
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Password" type="password" />
          <button className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-black">Continue</button>
        </div>
      </div>
    </main>
  );
}
