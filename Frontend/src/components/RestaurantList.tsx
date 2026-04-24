import type { Restaurant } from "../types/restaurant.types";

interface Props {
  restaurants: Restaurant[];
  loading: boolean;
  onDelete: (id: number) => void;
}

const RestaurantList = ({ restaurants, loading, onDelete }: Props) => {
  if (loading) return <p>Loading...</p>;

  if (restaurants.length === 0) {
    return <p>No restaurants found</p>;
  }

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {restaurants.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <img src={r.imageUrl} width="100%" />
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>{r.contact}</p>

          <button onClick={() => onDelete(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
