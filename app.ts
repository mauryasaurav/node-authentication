import express from "express";
import cors from "cors";
import session from 'express-session';
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";


import { config } from "./src/config/config";
import { appPassportInstance } from "./src/helpers/passport";
import { getDbClient } from "./src/db/connection";
import mainRoute from "./src/routes/index";

const app = express();

const corsOptions = {
  origin: config.CORS_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 200,
};


export const initApp = async () => {
  const db = await getDbClient();
  initMiddleware();
  initDefaultSessionAndRoutes(db);
  return app;
}

export const startApp = async () => {
  await initApp();
  app.listen(config.PORT, () => {
    console.log(`Server started with node environment: ${config.NODE_ENV}`);
    console.log(`Server is up and running on PORT ${config.PORT}`);
  });
}

const initMiddleware = () => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.set("trust proxy", 1); 
}

const initDefaultSessionAndRoutes = (db: any) => {
  // @ts-ignore
  app.use("/api", session({
    ...config.SESSION,
    store: MongoStore.create({ mongoUrl: config.DATABASE.MONGO_URL, dbName: config.DATABASE.DATABASE_NAME })
  }));
  
  app.use("/api", appPassportInstance.initialize());
  app.use("/api", appPassportInstance.session());

  // routes goes here
  app.use("/api", mainRoute);
}