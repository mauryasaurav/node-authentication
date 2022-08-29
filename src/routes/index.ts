import { Router } from "express";

import loginRoutes from "./login";
import registerRoutes from "./register";

const route = Router();

route.use("/", loginRoutes);
route.use("/register", registerRoutes);

export default route;
