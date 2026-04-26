import express from "express";
import { RestaurantController } from "../controllers/restaurant.controllers";
import { uploadConfig } from "../middlewares/upload.middleware";

export class RestaurantRoute {
  private router = express.Router();

  constructor(private controller: RestaurantController) {
    this.init();
  }

  private init() {
    this.router.post("/", uploadConfig.single("image"), (req, res) =>
      this.controller.create(req, res),
    );

    this.router.get("/", (req, res) => this.controller.getAll(req, res));

    this.router.put("/:id", uploadConfig.single("image"), (req, res) =>
      this.controller.update(req, res),
    );

    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));
  }

  public getRouter() {
    return this.router;
  }
}
