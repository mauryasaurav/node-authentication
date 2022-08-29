import { Request, Response } from "express";

import { sendErrorResponse } from "../helpers";
import { STATUS_CODES } from "../details.json";
import { loginValidate } from "../validations/login";
import { appPassportInstance } from "../helpers/passport";

// loginController - 
export const loginController = async (req: Request, res: Response) => {
  const validation = loginValidate(req.body);

  if (validation.error) {
    return sendErrorResponse(res, { statusCode: STATUS_CODES.BAD_REQUEST, error: JSON.parse(validation.error.message) });
  }

  await appPassportInstance.authenticate("login", (err: Error, user: any, info: any) => {
    if (err) return sendErrorResponse(res, { statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR, error: err });
    if (!user) return sendErrorResponse(res, { ...info, statusCode: STATUS_CODES.BAD_REQUEST });

    req.login(user, (err: any) => {
      const { full_name, email, _id } = user._doc;
      if (err) return sendErrorResponse(res, { error: "Something went wrong!", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR });
      return res.send({ success: true, message: "Login successfully!", data: { full_name, email, _id } });
    });
  })(req, res);
};

// checkUserAuthentication - 
export const checkUserAuthentication = (req: any, res: Response) => {
  if (req.user) {
    const { _id, full_name, email } = req.user;
    return res.send({ _id, full_name, email });
  }
  return res.send({ message: "user not loggedIn" });
};

// logoutController -
export const logoutController = (req: any, res: Response) => {
  req.logout();
  req.session.destroy();
  res.clearCookie("user");
  res.send({ message: "Successfully logout" });
};
