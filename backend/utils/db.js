import { Sequelize } from "sequelize";
import config from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const cfg = config[env];

const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, {
  host: cfg.host,
  dialect: cfg.dialect,
  logging: false
});

// Test connection
sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Connection error:", err));

export default sequelize;