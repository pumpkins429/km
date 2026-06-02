/**
 * Full-screen decorative background with ancient Chinese aesthetic.
 * Uses CSS gradients and patterns — no external images.
 * Dark base with subtle warm accents.
 */
export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Base gradient: dark stone to dark red-black */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-red-950/90 to-stone-950" />

      {/* Radial gold glow from upper-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(201,169,78,0.06), transparent 70%)",
        }}
      />

      {/* Faint silk/textile pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,169,78,0.5) 2px, rgba(201,169,78,0.5) 3px)",
        }}
      />

      {/* Decorative gold border accents */}
      <div className="absolute inset-x-0 top-0 h-px bg-amber-800/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-amber-800/20" />

      {/* Inset decorative border frame */}
      <div className="absolute inset-3 border border-amber-800/[0.07]" />
    </div>
  );
}
