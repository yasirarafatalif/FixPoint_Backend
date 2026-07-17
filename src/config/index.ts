import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
  ssl_store_id: process.env.SSL_STORE_ID!,
  ssl_store_password: process.env.SSL_STORE_PASSWORD!,
  ssl_store_frontend: process.env.FRONTEND_URL!,
  ssl_store_backend: process.env.BACKEND_URL!,
  ssl_store_live: process.env.SSL_IS_LIVE!,
};
