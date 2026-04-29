"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { BottomHint } from "@/components/layout/BottomHint";
import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";
import { ProjectPanel } from "@/components/portfolio/ProjectPanel";
import { SpaceScene } from "@/components/three/SpaceScene";
import { aboutSection, isProjectMoonId, solarBodies, systemSection, type SectionId } from "@/data/planets";
import { getProjectByMoonId } from "@/data/projects";

export function PortfolioExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<SectionId>("system");
  const [resetToken, setResetToken] = useState(0);

  const sectionLabel = useMemo(() => {
    if (selectedId === "system") {
      return systemSection.name;
    }
    if (selectedId === "about") {
      return aboutSection.name;
    }
    if (isProjectMoonId(selectedId)) {
      return getProjectByMoonId(selectedId)?.title;
    }
    return solarBodies.find((body) => body.id === selectedId)?.name;
  }, [selectedId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId("system");
        setResetToken((value) => value + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="space-shell">
      <div className="space-noise" />
      <TopBar />

      <SpaceScene
        reducedMotion={Boolean(prefersReducedMotion)}
        selectedId={selectedId}
        resetToken={resetToken}
        onSelect={setSelectedId}
      />

      <SideNav activeId={selectedId} onSelect={setSelectedId} />

      <ProjectPanel
        selectedId={selectedId}
        onClose={() => setSelectedId("system")}
        onSelectProjects={() => setSelectedId("projects")}
      />

      <BottomHint
        onReset={() => {
          setSelectedId("system");
          setResetToken((value) => value + 1);
        }}
      />

      <div className="pointer-events-none absolute bottom-6 right-4 z-30 hidden rounded-full border border-white/10 bg-black/24 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/45 backdrop-blur-xl md:block">
        {sectionLabel ?? systemSection.name}
      </div>
    </main>
  );
}
