export default function ImpactDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Impact level ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-[#fbbf24]" : "bg-[#1e293b]"
          }`}
        />
      ))}
    </div>
  );
}
