import { Orbit, Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pb-3 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div className="pointer-events-auto frost-panel panel-sheen flex items-center gap-3 rounded-full px-4 py-3 shadow-[0_16px_48px_rgba(2,4,12,0.35)]">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#a78bfa_360deg)]" />
            <div className="flex h-full w-full items-center justify-center rounded-full bg-black/60 backdrop-blur-md">
              <span className="bg-gradient-to-br from-violet-200 to-cyan-200 bg-clip-text font-display text-sm font-bold tracking-widest text-transparent">
                EV
              </span>
            </div>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
              Emmanuel Villegas
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 rounded-full border border-white/8 bg-black/20 px-6 py-3 shadow-[0_16px_36px_rgba(2,4,12,0.24)] backdrop-blur-md md:flex">
          <Sparkles className="h-4 w-4 text-violet-300/80" />
          <p className="hud-label text-white/52">Sistema Solar</p>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <p className="font-display text-xs tracking-[0.28em] text-violet-300">
            Portafolio
          </p>
        </div>

        <div className="pointer-events-auto frost-panel flex items-center gap-3 rounded-full px-4 py-3 shadow-[0_16px_48px_rgba(2,4,12,0.35)]">
          <span className="relative inline-flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(98,255,204,0.95)]" />
          </span>
          <span className="hud-label text-white/72">Online</span>
        </div>
      </div>
    </header>
  );
}
