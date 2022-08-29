import mongoose from "mongoose";
import { config } from "../config/config";

const { DATABASE }: any = config;

let db;

// getDbClient - 
export const getDbClient = async() => {
  db = await mongoose.connect(DATABASE.MONGO_URL, {})
  return db
}

export default db;
