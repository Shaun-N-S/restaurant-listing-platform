import { App } from "./app";
import dotenv from "dotenv";
import db from "./models";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let retries = 10;

  while (retries) {
    try {
      console.log("⏳ Connecting to DB...");

      await db.sequelize.authenticate();
      await db.sequelize.sync();

      console.log("✅ Database connected & synced");

      const appInstance = new App();

      appInstance.getApp().listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });

      break;
    } catch (err) {
      console.log("❌ DB not ready, retrying in 5 sec...");
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  if (!retries) {
    console.error("❌ Could not connect to DB");
    process.exit(1);
  }
};

startServer();
