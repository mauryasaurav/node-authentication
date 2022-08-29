import { Request, Response } from "express";

import { sendErrorResponse } from "../helpers";
import { STATUS_CODES } from "../details.json";
import { registerValidate } from "../validations/register";
import { appPassportInstance } from "../helpers/passport";

const { BAD_REQUEST } = STATUS_CODES;

// registerController -
export const registerController = async (req: Request, res: Response) => {
  const validation = registerValidate(req.body);
  if (validation.error) {
    return sendErrorResponse(res, { statusCode: BAD_REQUEST, error: JSON.parse(validation.error.message)});
  }
  try {
    await appPassportInstance.authenticate("register",
      async (err: Error, user: any) => {
        if (err) return sendErrorResponse(res, { statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR, error: err });
        if (!user) return sendErrorResponse(res, { ...user, statusCode: STATUS_CODES.BAD_REQUEST });
  
        req.login(user, (err: any) => {
          const { email, full_name, _id } = user;
          if (err) return sendErrorResponse(res, { error: "Something went wrong!", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR });
          return res.send({ success: true, message: "Register successfully!", data: { full_name, email,_id }});
        });
      }
    )(req, res);
  } catch(err) {
    return res.send({ error: err })
  }
};
