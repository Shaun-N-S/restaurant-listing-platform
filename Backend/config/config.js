require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "restaurant_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
};
