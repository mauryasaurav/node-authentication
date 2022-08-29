import { Request, Response, Router } from "express";

import { loginController, logoutController, checkUserAuthentication } from "../controllers/login";
import { withErrorHandler } from "../helpers";

const router = Router();

router.post("/login", (req: Request, res: Response) =>
  withErrorHandler(req, res, loginController)
);

router.get("/logout", (req: Request, res: Response) =>
  withErrorHandler(req, res, logoutController)
);

router.get("/checkAuthenticated", (req: Request, res: Response) =>
  withErrorHandler(req, res, checkUserAuthentication)
);

export default router;
