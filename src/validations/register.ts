import Joi from "joi";

import { generateJoiError } from "../helpers";

const registerVal = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).error(generateJoiError);

export const registerValidate = (data: any) => registerVal.validate(data, { abortEarly: false });
