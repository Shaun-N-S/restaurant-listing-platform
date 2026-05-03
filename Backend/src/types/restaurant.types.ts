export interface IRestaurant {
  id?: number;
  name: string;
  address: string;
  contact: string;
  imageUrl?: string;
}

export interface IPaginatedRestaurants {
  data: IRestaurant[];
  total: number;
}