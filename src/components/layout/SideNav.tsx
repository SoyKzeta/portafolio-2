"use client";

import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Code2,
  Mail,
  Orbit,
  Sparkles,
  UserRound,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

import type { SectionId } from "@/data/planets";
import { cn } from "@/lib/utils";

type SideNavProps = {
  activeId: SectionId;
  onSelect: (id: SectionId) => void;
};

const navItems: Array<{
  id: SectionId;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "system", label: "Sistema", icon: Orbit },
  { id: "about", label: "Sobre mí", icon: UserRound },
  { id: "flowsfy", label: "FlowsFy", icon: Sparkles },
  { id: "vivestone", label: "ViveStone", icon: BriefcaseBusiness },
  { id: "academic", label: "Académico", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "contact", label: "Contacto", icon: Mail },
];

export function SideNav({ activeId, onSelect }: SideNavProps) {
  return (
    <nav
      aria-label="Secciones principales"
      className="pointer-events-none absolute bottom-24 left-1/2 z-40 flex max-h-[calc(100dvh-130px)] w-[92vw] -translate-x-1/2 flex-col md:bottom-auto md:left-6 md:top-28 md:w-auto md:max-h-[calc(100dvh-150px)] md:translate-x-0 md:translate-y-0 xl:left-8"
    >
      <div className="pointer-events-auto frost-panel panel-sheen flex flex-row gap-2 overflow-x-auto overflow-y-hidden rounded-[1.8rem] px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-3 md:overflow-x-hidden md:overflow-y-auto md:rounded-[2rem] md:px-4 md:py-5 [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
              <motion.button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={isActive}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelect(item.id)}
              className={cn(
                "group relative flex shrink-0 items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors md:min-w-44 cursor-pointer",
                isActive
                  ? "bg-white/8 text-white shadow-[0_0_28px_rgba(130,101,255,0.16)]"
                  : "text-white/58 hover:bg-white/[0.045] hover:text-white/88",
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                  isActive
                    ? "border-violet-400/40 bg-violet-500/20 text-violet-100 shadow-[0_0_24px_rgba(168,127,255,0.4)]"
                    : "border-white/8 bg-white/[0.02] text-white/50 group-hover:scale-110 group-hover:border-white/20 group-hover:text-white/90 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div className="hidden min-w-0 md:block">
                <p className={cn("text-[1.05rem] tracking-[0.015em] transition-all", isActive ? "font-semibold text-white" : "font-medium")}>{item.label}</p>
              </div>

              {isActive ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.9),0_0_8px_rgba(167,139,250,0.8)] md:left-1 md:top-1/2 md:h-8 md:w-1 md:-translate-x-0 md:-translate-y-1/2"
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
