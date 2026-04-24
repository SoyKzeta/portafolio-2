type SectionBadgeProps = {
  label: string;
  accent?: string;
};

export function SectionBadge({ label, accent }: SectionBadgeProps) {
  return (
    <span
      className="group inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.8rem] font-medium tracking-wide text-slate-200 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
      style={{
        borderColor: accent ? `${accent}40` : "rgba(255,255,255,0.15)",
        background: accent ? `${accent}15` : "rgba(255,255,255,0.06)",
        boxShadow: accent ? `0 4px 12px ${accent}25, inset 0 1px 0 rgba(255,255,255,0.1)` : "none",
      }}
    >
      {accent && (
        <span
          className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125"
          style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}
        />
      )}
      {label}
    </span>
  );
}
