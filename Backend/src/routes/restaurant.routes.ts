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
      (req, res, next) => this.controller.create(req, res, next),
    );

    this.router.get(API_ROUTES.RESTAURANTS.BASE, (req, res, next) =>
      this.controller.getAll(req, res, next),
    );

    this.router.put(
      API_ROUTES.RESTAURANTS.BY_ID,
      uploadConfig.single("image"),
      (req, res, next) => this.controller.update(req, res, next),
    );

    this.router.delete(API_ROUTES.RESTAURANTS.BY_ID, (req, res, next) =>
      this.controller.delete(req, res, next),
    );
  }

  public getRouter() {
    return this.router;
  }
}
