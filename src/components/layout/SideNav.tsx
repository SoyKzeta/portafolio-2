"use client";

import type { LucideIcon } from "lucide-react";
import { Code2, FolderKanban, Mail, Orbit, UserRound, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  isProjectMoonId,
  type SectionId,
  PROJECT_MOON_IDS,
} from "@/data/planets";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const moonLabel: Record<string, string> = {
  flowsfy: "FlowsFy",
  vivestone: "ViveStone",
  parking: "Parking",
  "inventory-rentals": "Inventario",
  "restaurant-app": "Restaurante",
};

const navItems: Array<{
  id: SectionId;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "system", label: "Sistema", icon: Orbit },
  { id: "about", label: "Sobre mí", icon: UserRound },
  { id: "projects", label: "Proyectos", icon: FolderKanban },
  { id: "skills", label: "Habilidades", icon: Code2 },
  { id: "contact", label: "Contacto", icon: Mail },
];

type SideNavProps = {
  activeId: SectionId;
  onSelect: (id: SectionId) => void;
};

export function SideNav({ activeId, onSelect }: SideNavProps) {
  const projectsOrMoon =
    activeId === "projects" || isProjectMoonId(activeId);
  const showMoonRow = projectsOrMoon;

  return (
    <nav
      aria-label="Secciones principales"
      className="pointer-events-none absolute bottom-24 left-1/2 z-40 flex max-h-[calc(100dvh-130px)] w-[92vw] -translate-x-1/2 flex-col md:bottom-auto md:left-6 md:top-28 md:w-auto md:max-h-[calc(100dvh-150px)] md:translate-x-0 md:translate-y-0 xl:left-8"
    >
      <div className="pointer-events-auto frost-panel panel-sheen flex max-w-[92vw] flex-row items-stretch gap-1.5 overflow-x-auto overflow-y-hidden rounded-[1.8rem] py-2 pl-2 pr-2 [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:flex-col md:gap-0 md:overflow-x-hidden md:overflow-y-auto md:rounded-[2rem] md:px-2 md:py-4 [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const projectsActive = activeId === "projects" || (item.id === "projects" && isProjectMoonId(activeId));

          return (
            <div key={item.id} className="shrink-0 min-w-0">
              <motion.button
                type="button"
                aria-label={item.label}
                aria-pressed={isActive || projectsActive}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelect(item.id)}
                className={cn(
                  "group relative flex w-auto shrink-0 items-center gap-2 rounded-2xl px-2.5 py-2.5 text-left transition-colors md:min-w-48 md:gap-3 cursor-pointer",
                  isActive || projectsActive
                    ? "bg-white/8 text-white shadow-[0_0_28px_rgba(130,101,255,0.16)]"
                    : "text-white/58 hover:bg-white/[0.045] hover:text-white/88",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isActive || projectsActive
                      ? "border-violet-400/40 bg-violet-500/20 text-violet-100 shadow-[0_0_24px_rgba(168,127,255,0.4)]"
                      : "border-white/8 bg-white/[0.02] text-white/50 group-hover:scale-110 group-hover:border-white/20",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div className="hidden min-w-0 flex-1 md:block">
                  <p
                    className={cn(
                      "text-[1.05rem] tracking-[0.015em] transition-all",
                      isActive || projectsActive
                        ? "font-semibold text-white"
                        : "font-medium",
                    )}
                  >
                    {item.label}
                  </p>
                </div>

                {isActive || projectsActive ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.9)] md:bottom-auto md:left-1 md:top-1/2 md:h-8 md:w-1 md:translate-x-0 md:-translate-y-1/2"
                  />
                ) : null}
              </motion.button>

              <AnimatePresence>
                {item.id === "projects" && showMoonRow ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden overflow-hidden md:ml-2 md:block md:border-l md:border-white/8 md:pl-2"
                  >
                    {PROJECT_MOON_IDS.map((mid) => {
                      const label = moonLabel[mid] ?? mid;
                      const p = projects.find((r) => r.slug === mid);
                      const isMoonActive = activeId === mid;
                      return (
                        <button
                          key={mid}
                          type="button"
                          onClick={() => onSelect(mid)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left text-xs transition-all md:py-2 md:text-sm",
                            isMoonActive
                              ? "bg-white/10 text-white"
                              : "text-white/45 hover:bg-white/5 hover:text-white/80",
                          )}
                        >
                          <ChevronRight className="h-3 w-3 opacity-50" />
                          <span className="truncate">{p?.title ?? label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
