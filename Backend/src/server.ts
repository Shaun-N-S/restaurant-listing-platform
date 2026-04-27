import { App } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const appInstance = new App();

appInstance.getApp().listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
