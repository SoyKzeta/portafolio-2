import { Orbit, Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pb-3 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div className="pointer-events-auto frost-panel panel-sheen flex items-center gap-3 rounded-full px-4 py-3 shadow-[0_16px_48px_rgba(2,4,12,0.35)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white">
            <Orbit className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-lg tracking-[0.12em] text-white">EV</p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
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
