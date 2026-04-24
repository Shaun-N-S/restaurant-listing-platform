export interface Restaurant {
  id: number;
  name: string;
  address: string;
  contact: string;
  imageUrl?: string;
}

export interface RestaurantInput {
  name: string;
  address: string;
  contact: string;
  imageUrl?: string;
}
