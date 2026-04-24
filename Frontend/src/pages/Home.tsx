import { useEffect, useState } from "react";
import { getRestaurants, deleteRestaurant } from "../api/restaurant.api";
import RestaurantList from "../components/RestaurantList";
import RestaurantModal from "../components/RestaurantFormModal";
import toast from "react-hot-toast";
import type { Restaurant } from "../types/restaurant.types";

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    const loadData = async () => {
      await fetchRestaurants();
    };
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));

    try {
      await deleteRestaurant(id);

      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
      fetchRestaurants();
    }
  };

  return (
    <div>
      <h1>Restaurant App</h1>

      <button onClick={() => setShowModal(true)}>+ Add Restaurant</button>

      <RestaurantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchRestaurants}
      />

      <RestaurantList
        restaurants={restaurants}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
