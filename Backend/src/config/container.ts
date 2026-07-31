import { RestaurantRepository } from "../repositories/restaurant.repository";
import { RestaurantService } from "../services/restaurant.services";
import { ImageService } from "../services/image.services";
import { RestaurantController } from "../controllers/restaurant.controllers";

const restaurantRepository = new RestaurantRepository();

const restaurantService = new RestaurantService(restaurantRepository);

const imageService = new ImageService();

const restaurantController = new RestaurantController(
  restaurantService,
  imageService,
);

export const container = {
  restaurantController,
};
