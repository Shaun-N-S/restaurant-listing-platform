import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, loading }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    if (isOpen) {
      id = setTimeout(() => setVisible(true), 10);
    }

    return () => clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-200 ${
          visible ? "scale-100 translate-y-0" : "scale-95 translate-y-3"
        }`}
        style={{
          background:
            "linear-gradient(160deg, rgba(15,20,35,0.99) 0%, rgba(10,14,26,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(239,68,68,0.1)",
        }}
      >
        {/* Top danger accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(239,68,68,0.5), rgba(248,113,113,0.3), transparent)",
          }}
        />

        {/* Content */}
        <div className="px-6 pt-6 pb-5">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.18)",
            }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: "#f87171" }}
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
          </div>

          <h2
            className="font-semibold text-[15px] mb-1.5"
            style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "-0.2px" }}
          >
            Delete restaurant?
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            This will permanently remove this listing. This action cannot be
            undone.
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mx-6"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] disabled:opacity-40"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              color: "rgba(148,163,184,0.6)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.color = "rgba(148,163,184,0.6)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-60 flex items-center justify-center gap-2"
            style={{
              background: loading ? "#dc2626" : "#ef4444",
              color: "#fff",
              boxShadow: loading ? "none" : "0 0 16px rgba(239,68,68,0.25)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "#f87171";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(239,68,68,0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(239,68,68,0.25)";
            }}
          >
            {loading ? (
              <>
                <svg
                  className="w-3.5 h-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
