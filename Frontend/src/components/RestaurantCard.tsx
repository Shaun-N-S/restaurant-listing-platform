import type { Restaurant } from "../types/restaurant.types";

interface Props {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (id: number) => void;
}

const RestaurantCard = ({ restaurant: r, onDelete, onEdit }: Props) => {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(99,102,241,0.2)";
        e.currentTarget.style.boxShadow =
          "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1), 0 1px 0 rgba(255,255,255,0.06) inset";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.04) inset";
      }}
    >
      {/* Image */}
      <div
        className="relative w-full h-48 sm:h-52 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {r.imageUrl ? (
          <>
            <img
              src={r.imageUrl}
              alt={r.name}
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
            />
            {/* Multi-layer gradient for premium depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.4) 40%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(8,11,20,0.2) 0%, transparent 60%)",
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-5xl" style={{ opacity: 0.07 }}>
              🍽
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.1)" }}
            >
              No image
            </span>
          </div>
        )}

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(8,11,20,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <span className="text-[10px] font-medium tracking-wide text-white/50 uppercase">
            Open
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3
          className="font-semibold text-[15px] leading-snug mb-3 truncate"
          style={{
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "-0.2px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {r.name}
        </h3>

        {/* Meta rows */}
        <div className="space-y-2 mb-5">
          <div className="flex items-start gap-2.5">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-px"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <svg
                className="w-2.5 h-2.5"
                style={{ color: "rgba(129,140,248,0.8)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p
              className="text-[11px] leading-relaxed line-clamp-2 flex-1"
              style={{ color: "rgba(148,163,184,0.6)" }}
            >
              {r.address}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <svg
                className="w-2.5 h-2.5"
                style={{ color: "rgba(129,140,248,0.8)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <p
              className="text-[11px]"
              style={{ color: "rgba(148,163,184,0.6)" }}
            >
              {r.contact}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-4"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(r)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-200 active:scale-[0.97]"
            style={{
              border: "1px solid rgba(99,102,241,0.15)",
              background: "rgba(99,102,241,0.05)",
              color: "rgba(129,140,248,0.7)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.12)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
              e.currentTarget.style.color = "rgba(165,180,252,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.05)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
              e.currentTarget.style.color = "rgba(129,140,248,0.7)";
            }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(r.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-200 active:scale-[0.97]"
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
              color: "rgba(148,163,184,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.07)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
              e.currentTarget.style.color = "rgba(252,165,165,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(148,163,184,0.4)";
            }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
