import { Router } from "express";

import { withErrorHandler } from "../helpers";
import { registerController } from "../controllers/register";

const router = Router();
router.post("/", (req, res) => withErrorHandler(req, res, registerController));

export default router;
