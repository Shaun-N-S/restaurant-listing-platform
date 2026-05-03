import { useState } from "react";
import type { Restaurant } from "../types/restaurant.types";
import RestaurantCard from "./RestaurantCard";
import ConfirmModal from "./ConfirmModal";
import RestaurantModal from "./RestaurantFormModal";
import type { CreateRestaurantResponse } from "../api/restaurant.api";

interface Props {
  restaurants: Restaurant[];
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
  onSuccess: (data: CreateRestaurantResponse) => void;
}

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 sm:py-32 gap-6">
    {/* Layered rings */}
    <div className="relative flex items-center justify-center">
      <div
        className="absolute w-36 h-36 rounded-full"
        style={{ border: "1px solid rgba(99,102,241,0.05)" }}
      />
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{ border: "1px solid rgba(99,102,241,0.08)" }}
      />
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <span className="text-2xl">🍽</span>
      </div>
    </div>

    <div className="text-center space-y-2">
      <p
        className="font-semibold text-sm"
        style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "-0.1px" }}
      >
        {"No restaurants yet"}
      </p>
      <p
        className="text-xs leading-relaxed max-w-[200px] mx-auto"
        style={{ color: "rgba(148,163,184,0.4)" }}
      >
        {"Add your first restaurant to get started"}
      </p>
    </div>
  </div>
);

const RestaurantList = ({
  restaurants,
  loading,
  onDelete,
  onSuccess,
}: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<Restaurant | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditData(restaurant);
    setMode("edit");
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedId) return;
    try {
      setBtnLoading(true);
      await onDelete(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        {/* 🔥 LOADING OVERLAY */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
            <span className="text-white text-sm">Loading...</span>
          </div>
        )}

        {/* 🔥 KEEP OLD DATA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {restaurants.length === 0 ? (
            <EmptyState />
          ) : (
            restaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      <RestaurantModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSuccess={(res) => {
          onSuccess(res);
          setModalOpen(false);
          setEditData(null);
        }}
        mode={mode}
        initialData={editData}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirm}
        loading={btnLoading}
      />
    </>
  );
};

export default RestaurantList;
