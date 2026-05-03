import express, { type Application } from "express";
import cors from "cors";
import { RestaurantRepository } from "./repositories/restaurant.repository";
import { RestaurantService } from "./services/restaurant.services";
import { RestaurantController } from "./controllers/restaurant.controllers";
import { RestaurantRoute } from "./routes/restaurant.routes";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setRoutes() {
    const repo = new RestaurantRepository();
    const service = new RestaurantService(repo);
    const controller = new RestaurantController(service);

    const route = new RestaurantRoute(controller);
    this.app.use("/api/restaurants", route.getRouter());

    this.app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });
  }

  public getApp() {
    return this.app;
  }
}
