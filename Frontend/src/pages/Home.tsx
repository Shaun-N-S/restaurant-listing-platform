import { useEffect, useState } from "react";
import { getRestaurants, deleteRestaurant } from "../api/restaurant.api";
import RestaurantList from "../components/RestaurantList";
import RestaurantModal from "../components/RestaurantFormModal";
import toast from "react-hot-toast";
import type { Restaurant } from "../types/restaurant.types";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 350);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await getRestaurants();
      setRestaurants(res.data.data);
    } catch {
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchRestaurants();
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    const prev = restaurants;

    setRestaurants((curr) => curr.filter((r) => r.id !== id));

    try {
      await deleteRestaurant(id);
      toast.success("Restaurant removed");
    } catch {
      toast.error("Delete failed");
      setRestaurants(prev);
    }
  };

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      r.address.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen bg-[#080b14]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-violet-900/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-900/8 blur-[100px]" />
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-20 border-b border-white/[0.04]"
        style={{
          background: "rgba(8,11,20,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-16">
            {/* Brand */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="relative w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <span className="text-sm">🍽</span>
                <div className="absolute inset-0 bg-white/10 rounded-xl" />
              </div>
              <span className="text-white font-semibold text-[15px] tracking-[-0.3px] hidden sm:block">
                Fork<span className="text-indigo-400">Map</span>
              </span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="relative group">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search restaurants..."
                  className="w-full text-sm text-white placeholder:text-slate-600 rounded-xl pl-9 pr-9 py-2 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Add button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl text-white transition-all active:scale-95 shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(99,102,241,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(99,102,241,0.3)";
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">Add Restaurant</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stats row */}
        {!loading && (
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-slate-400 text-sm">
                  {debouncedSearch
                    ? `${filtered.length} of ${restaurants.length} results`
                    : `${restaurants.length} restaurant${restaurants.length !== 1 ? "s" : ""}`}
                </span>
              </div>
              {debouncedSearch && filtered.length !== restaurants.length && (
                <button
                  onClick={() => setSearch("")}
                  className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors border border-indigo-500/20 rounded-lg px-2.5 py-1 hover:border-indigo-500/40"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Refresh hint */}
            <button
              onClick={fetchRestaurants}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-400 text-xs transition-colors"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        )}

        <RestaurantList
          restaurants={filtered}
          loading={loading}
          onDelete={handleDelete}
          onRefresh={fetchRestaurants}
        />
      </main>

      <RestaurantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchRestaurants}
        mode="create"
        initialData={null}
      />
    </div>
  );
};

export default Home;
