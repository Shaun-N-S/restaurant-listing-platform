import express from "express";
import { RestaurantController } from "../controllers/restaurant.controllers";
import { uploadConfig } from "../middlewares/upload.middleware";
import { API_ROUTES } from "../constants/apiRoutes";

export class RestaurantRoute {
  private router = express.Router();

  constructor(private controller: RestaurantController) {
    this.init();
  }

  private init() {
    this.router.post(
      API_ROUTES.RESTAURANTS.BASE,
      uploadConfig.single("image"),
      (req, res) => this.controller.create(req, res),
    );

    this.router.get(API_ROUTES.RESTAURANTS.BASE, (req, res) =>
      this.controller.getAll(req, res),
    );

    this.router.put(
      API_ROUTES.RESTAURANTS.BY_ID,
      uploadConfig.single("image"),
      (req, res) => this.controller.update(req, res),
    );

    this.router.delete(API_ROUTES.RESTAURANTS.BY_ID, (req, res) =>
      this.controller.delete(req, res),
    );
  }

  public getRouter() {
    return this.router;
  }
}
