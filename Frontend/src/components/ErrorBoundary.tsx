import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-[#080b14] px-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div
            className="w-full max-w-sm rounded-3xl overflow-hidden text-center px-6 py-8"
            style={{
              background:
                "linear-gradient(160deg, rgba(15,20,35,0.99) 0%, rgba(10,14,26,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            }}
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-5"
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
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            <h2
              className="font-semibold text-[15px] mb-1.5"
              style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "-0.2px" }}
            >
              Something went wrong
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              An unexpected error occurred while rendering this page. You can
              try again below.
            </p>

            <button
              onClick={this.handleRetry}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
