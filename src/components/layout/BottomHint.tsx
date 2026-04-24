"use client";

import { Home, MousePointer2, Move3D, ScanSearch } from "lucide-react";
import { motion } from "framer-motion";

type BottomHintProps = {
  onReset: () => void;
};

const hints = [
  { icon: Move3D, label: "Arrastra para rotar" },
  { icon: ScanSearch, label: "Scroll para zoom" },
  { icon: MousePointer2, label: "Haz clic en un planeta" },
];

export function BottomHint({ onReset }: BottomHintProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-6 left-6 z-20 hidden [@media(min-height:850px)]:md:block"
      >
        <div className="pointer-events-auto frost-panel rounded-[1.6rem] px-5 py-5 shadow-[0_20px_60px_rgba(2,4,12,0.34)] md:px-6">
          <div className="space-y-3">
            {hints.map(({ icon: Icon, label }) => (
              <div key={label} className="group flex items-center gap-3.5 text-[0.95rem] text-white/75">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] text-white/90 transition-all group-hover:border-white/25 group-hover:bg-white/[0.08]">
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </span>
                <span className="transition-colors duration-300 group-hover:text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={onReset}
        className="group pointer-events-auto absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-6 py-3.5 text-[0.95rem] font-medium text-white shadow-[0_18px_50px_rgba(2,4,12,0.4),0_0_20px_rgba(167,139,250,0.15)] backdrop-blur-xl transition-all hover:scale-105 hover:border-white/20 hover:from-violet-500/30 hover:to-fuchsia-500/30 hover:shadow-[0_18px_50px_rgba(2,4,12,0.4),0_0_30px_rgba(167,139,250,0.3)] active:scale-95 md:bottom-8"
      >
        <Home className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Vista inicial
      </motion.button>
    </>
  );
}
