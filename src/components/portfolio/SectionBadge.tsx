type SectionBadgeProps = {
  label: string;
  accent?: string;
};

export function SectionBadge({ label, accent }: SectionBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.8rem] font-medium tracking-wide text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.08]"
      style={{
        borderColor: accent ? `${accent}35` : "rgba(255,255,255,0.1)",
        background: accent ? `${accent}15` : "rgba(255,255,255,0.04)",
      }}
    >
      {accent && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      )}
      {label}
    </span>
  );
}
