import express, { type Application } from "express";
import cors from "cors";
import { RestaurantRoute } from "./routes/restaurant.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { container } from "./config/container";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setRoutes() {
    const restaurantRoute = new RestaurantRoute(container.restaurantController);

    this.app.use("/api/restaurants", restaurantRoute.getRouter());

    this.app.get("/health", (_, res) => {
      res.status(200).send("OK");
    });
  }

  public getApp() {
    return this.app;
  }
}
