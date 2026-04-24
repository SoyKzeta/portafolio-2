"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  PanelRightClose,
  RadioTower,
  Sparkles,
} from "lucide-react";

import { SectionBadge } from "@/components/portfolio/SectionBadge";
import type { SolarBody, SectionId } from "@/data/planets";
import { featuredProject } from "@/data/projects";

type ProjectPanelProps = {
  selectedId: SectionId;
  selectedBody?: SolarBody;
  onClose: () => void;
  onSelectProjects: () => void;
};

function PreviewCard({
  variant,
  accent,
}: {
  variant: "overview" | "dashboard" | "profile" | "skills" | "timeline" | "signal";
  accent: string;
}) {
  return (
    <div className="preview-grid h-44 p-4">
      <div className="preview-scanline" />
      <div
        className="absolute inset-x-4 top-4 h-1 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 24px ${accent}`,
        }}
      />

      {variant === "dashboard" ? (
        <div className="relative grid h-full grid-cols-[1.05fr_1.5fr] gap-3">
          <div className="space-y-2 rounded-2xl border border-white/8 bg-black/18 p-3">
            <div className="h-3 w-20 rounded-full bg-white/16" />
            <div className="space-y-1.5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-8 rounded-xl bg-white/[0.055]" />
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.05] p-3">
                  <div
                    className="mb-2 h-1.5 rounded-full"
                    style={{ backgroundColor: accent, opacity: 0.72 - index * 0.15 }}
                  />
                  <div className="h-3 w-10 rounded-full bg-white/12" />
                </div>
              ))}
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.045] p-4">
              <div className="mb-4 flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className="h-2 w-2 rounded-full bg-white/20" />
                ))}
              </div>
              <div className="flex h-16 items-end gap-2">
                {[36, 72, 44, 96, 64, 82].map((height) => (
                  <div
                    key={height}
                    className="flex-1 rounded-t-xl"
                    style={{
                      height,
                      background: `linear-gradient(180deg, ${accent}, transparent)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : variant === "profile" ? (
        <div className="relative flex h-full gap-4">
          <div className="flex w-24 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/8 bg-black/18">
            <div
              className="h-16 w-16 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 35%, white 0%, ${accent} 45%, transparent 92%)`,
                boxShadow: `0 0 32px ${accent}88`,
              }}
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-3">
              <div className="h-3 w-28 rounded-full bg-white/16" />
              <div className="mt-3 h-10 rounded-xl bg-white/[0.045]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-3">
                <div className="mb-3 h-2.5 w-12 rounded-full bg-white/14" />
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-8 flex-1 rounded-full"
                      style={{
                        backgroundColor: accent,
                        opacity: 0.16 + index * 0.08,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-2 h-3 rounded-full bg-white/10 last:mb-0" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : variant === "skills" ? (
        <div className="relative flex h-full items-center justify-center">
          <div
            className="absolute h-28 w-28 rounded-full border"
            style={{ borderColor: `${accent}50`, boxShadow: `0 0 32px ${accent}30` }}
          />
          <div
            className="absolute h-40 w-40 rounded-full border border-dashed"
            style={{ borderColor: `${accent}36` }}
          />
          <div className="absolute h-52 w-52 rounded-full border border-white/8" />
          {[0, 72, 144, 216, 288].map((rotation, index) => (
            <div
              key={rotation}
              className="absolute h-2 w-2 rounded-full"
              style={{
                transform: `rotate(${rotation}deg) translateY(-84px)`,
                backgroundColor: accent,
                boxShadow: `0 0 20px ${accent}`,
                opacity: 0.62 + index * 0.06,
              }}
            />
          ))}
          <div
            className="h-20 w-20 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, white 0%, ${accent} 34%, rgba(13,14,24,0.85) 100%)`,
            }}
          />
        </div>
      ) : variant === "timeline" ? (
        <div className="relative grid h-full gap-4">
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
            <div className="h-12 w-12 rounded-full border border-white/10 bg-black/18" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 rounded-full bg-white/16" />
              <div className="h-3 w-32 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="relative flex-1 rounded-[1.4rem] border border-white/8 bg-black/15 px-4 py-5">
            <div className="absolute bottom-5 left-8 top-5 w-px bg-white/10" />
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative mb-6 flex items-start gap-4 last:mb-0">
                <span
                  className="relative z-10 mt-1.5 h-4 w-4 rounded-full"
                  style={{ backgroundColor: accent, boxShadow: `0 0 18px ${accent}` }}
                />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded-full bg-white/14" />
                  <div className="h-3 w-40 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : variant === "signal" ? (
        <div className="relative flex h-full items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full border border-white/10" />
          <div
            className="absolute h-36 w-36 rounded-full border border-dashed"
            style={{ borderColor: `${accent}4f` }}
          />
          <div
            className="absolute h-52 w-52 rounded-full border"
            style={{ borderColor: `${accent}22` }}
          />
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle, ${accent} 0%, rgba(13,14,24,0.6) 68%)`,
              boxShadow: `0 0 44px ${accent}88`,
            }}
          >
            <RadioTower className="h-7 w-7 text-white" />
          </div>
        </div>
      ) : (
        <div className="relative grid h-full grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.045] p-3">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-300" />
              <div className="h-3 w-24 rounded-full bg-white/16" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-8 rounded-xl bg-white/[0.055]" />
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[1.25rem] border border-white/8 bg-black/18 p-3">
              <div className="mb-3 h-3 w-14 rounded-full bg-white/12" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-3 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
            <div
              className="rounded-[1.25rem] border border-white/8"
              style={{
                background: `radial-gradient(circle at top, ${accent}28, rgba(255,255,255,0.03) 65%)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectPanel({
  selectedId,
  selectedBody,
  onClose,
  onSelectProjects,
}: ProjectPanelProps) {
  const isSystem = selectedId === "system" || !selectedBody;
  const accent = selectedBody?.glowColor ?? "#9a7cff";
  const title = isSystem ? featuredProject.title : selectedBody.name;
  const kicker = isSystem ? featuredProject.kicker : selectedBody.subtitle;
  const label = isSystem ? "Proyecto destacado" : selectedBody.panelLabel;
  const description = isSystem ? featuredProject.summary : selectedBody.description;
  const secondary = isSystem ? featuredProject.detail : null;
  const stack = isSystem ? featuredProject.stack : selectedBody.stack;
  const previewVariant = isSystem ? "overview" : selectedBody.previewVariant;
  const primaryAction = isSystem
    ? {
        label: "Ver proyecto",
        href: featuredProject.demo,
        external: true,
      }
      : selectedId === "contact"
      ? {
          label: "Enviar mensaje",
          href: selectedBody.href,
          external: true,
        }
      : selectedId === "about"
      ? {
          label: "Ver LinkedIn",
          href: "https://www.linkedin.com/in/emmanuelvillegasurrea/",
          external: true,
        }
      : selectedId === "flowsfy" || selectedId === "vivestone"
        ? {
            label: "Ver proyecto",
            href: selectedBody.demo ?? featuredProject.demo,
            external: true,
          }
        : {
            label: "Ver proyectos",
            href: null,
            external: false,
          };
  const secondaryAction =
    isSystem || selectedId === "flowsfy" || selectedId === "vivestone" || selectedId === "academic" || selectedId === "about"
      ? {
          label: "Ver código",
          href: selectedBody?.github ?? featuredProject.github,
        }
      : {
          label: "GitHub",
          href: featuredProject.github,
        };

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-24 z-30 flex max-h-[calc(100dvh-130px)] flex-col justify-end md:inset-x-auto md:bottom-auto md:right-6 md:top-28 md:w-[min(92vw,28rem)] md:max-h-[calc(100dvh-150px)] md:justify-start xl:right-8">
      <AnimatePresence mode="wait">
        {!isSystem && selectedBody && (
          <motion.aside
            key={selectedId}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.88, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 0, y: 0, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto frost-panel panel-sheen flex-1 overflow-y-auto rounded-[1.75rem] p-6 [-ms-overflow-style:none] [scrollbar-width:none] md:p-8 [&::-webkit-scrollbar]:hidden"
            style={{
              borderColor: `${accent}36`,
              boxShadow: `0 28px 90px rgba(3,4,12,0.58), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px ${accent}18, 0 0 44px ${accent}12`,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-[1.75rem] opacity-70"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                boxShadow: `0 0 20px ${accent}`,
              }}
            />
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-widest text-violet-400">{label}</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {title}
                </h2>
                <p className="mt-2 text-[1.1rem] font-medium text-slate-300">{kicker}</p>
              </div>

              <button
                type="button"
                aria-label="Cerrar panel"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <PanelRightClose className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/10">
              <PreviewCard variant={previewVariant} accent={accent} />
            </div>

            <div className="mt-7 space-y-4">
              <p className="text-[1.05rem] leading-relaxed text-slate-200">{description}</p>
              {secondary && (
                <p className="text-[0.95rem] leading-relaxed text-slate-400">{secondary}</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <SectionBadge key={item} label={item} accent={accent} />
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {primaryAction.external && primaryAction.href ? (
                <a
                  href={primaryAction.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.95rem] font-medium text-white transition-all hover:brightness-110 active:scale-95"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 8px 20px -4px ${accent}60, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    border: `1px solid ${accent}`,
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 flex items-center gap-2">
                    {primaryAction.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onSelectProjects}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.95rem] font-medium text-white transition-all hover:brightness-110 active:scale-95"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 8px 20px -4px ${accent}60, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    border: `1px solid ${accent}`,
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 flex items-center gap-2">
                    {primaryAction.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              )}

              <a
                href={secondaryAction.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-[0.95rem] font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
              >
                {secondaryAction.label}
                <Code2 className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
