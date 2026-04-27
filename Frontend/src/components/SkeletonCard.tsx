interface SkeletonCardProps {
  delay?: number;
}

const SkeletonCard = ({ delay = 0 }: SkeletonCardProps) => {
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: `shimmer 1.8s ease-in-out infinite`,
          animationDelay: `${delay}ms`,
        }}
      />

      {/* Image placeholder */}
      <div
        className="w-full h-52"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />

      {/* Badge placeholder */}
      <div
        className="absolute top-3 right-3 w-20 h-5 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      {/* Content */}
      <div className="p-5">
        {/* Name line */}
        <div
          className="h-3.5 rounded-lg w-[58%] mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Meta rows */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-md shrink-0"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <div
              className="h-2.5 rounded-lg flex-1"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-md shrink-0"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <div
              className="h-2.5 rounded-lg w-2/5"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-4"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />

        {/* Button placeholders */}
        <div
          className="h-9 rounded-xl mb-2.5"
          style={{ background: "rgba(255,255,255,0.03)" }}
        />
        <div
          className="h-9 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)" }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default SkeletonCard;
