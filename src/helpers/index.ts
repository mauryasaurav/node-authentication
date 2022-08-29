import { STATUS_CODES } from "../details.json";

// withErrorHandler -
export const withErrorHandler = async (
  req: any,
  res: any,
  apiFunction: Function
) => {
  try {
      await apiFunction(req, res);
  } catch (error: any) {
    console.log("Error- " + req.baseUrl + error);
    return sendErrorResponse(res, {
      error: error || { message: "Something went wrong" },
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
};


/**
 *
 * Send error response
 * @param res - res object of a request
 * @param errorResponse - an object which contains an http status code for the error and an error object
 */
interface errorResponse {
  statusCode: Number;
  error: Object;
}

// sendErrorResponse -
export const sendErrorResponse = (res: any, errorResponse: errorResponse) => {
  res.status(errorResponse.statusCode).send({ success: false, error: errorResponse.error });
}

// generateJoiError -
export const generateJoiError = (errors: Object[]) => {
  let newError = {};
  errors.forEach((err: any) => {
    switch (err.code) {
      case "any.required":
        addErrorMessage(newError, err.local.key, "Value is required");
        break;
      case "any.empty":
        addErrorMessage(newError, err.local.key, "Value cannot be empty");
        break;
      case "string.base":
        addErrorMessage(newError, err.local.key, "Value must be a string");
        break;
      case "string.email":
        addErrorMessage(newError, err.local.key, "Value must be a valid email");
        break;
      case "number.base":
        addErrorMessage(newError, err.local.key, "Value must be a number");
        break;
      case "phoneNumber.invalid":
        addErrorMessage(
          newError,
          err.local.key,
          "Value must be a valid phone number"
        );
        break;
      case "date.format":
        addErrorMessage(
          newError,
          err.local.key,
          `Value must be in ${err.local.format} format`
        );
        break;
      case "number.integer":
        addErrorMessage(
          newError,
          err.local.key,
          "Value cannot be a decimal number"
        );
        break;
      case "number.positive":
        addErrorMessage(
          newError,
          err.local.key,
          "Value cannot be a negative number"
        );
        break;
      case "string.alphanum":
        addErrorMessage(
          newError,
          err.local.key,
          "Value cannot contain any special characters"
        );
        break;
      case "string.uri":
        addErrorMessage(
          newError,
          err.local.key,
          "Value must be a valid web address"
        );
        break;
      case "string.max":
        addErrorMessage(
          newError,
          err.local.key,
          `Value cannot contain more than ${err.local.limit} characters`
        );
        break;
      case "date.min":
        addErrorMessage(
          newError,
          err.local.key,
          `Date must be after ${err.local.limit.toDateString()}`
        );
        break;
      case "date.max":
        addErrorMessage(
          newError,
          err.local.key,
          `Date must be before ${err.local.limit.toDateString()}`
        );
        break;
      case "number.min":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "number.max":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "string.empty":
        addErrorMessage(newError, err.local.key, "Value cannot be empty");
        break;
      case "date.base":
        addErrorMessage(newError, err.local.key, "Invalid date");
        break;
      case "any.only":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "number.unsafe":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "string.length":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "string.pattern.base":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "any.invalid":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "date.less":
        addErrorMessage(
          newError,
          err.local.key,
          `Must be less than ${err.local.limit.key}`
        );
        break;
      case "string.uriCustomScheme":
        addErrorMessage(newError, err.local.key, "Value is invalid");
        break;
      case "object.unknown":
        addErrorMessage(
          newError,
          err.local.key,
          `${err.local.key} is not allowed`
        );
        break;
      case "array.base":
        addErrorMessage(
          newError,
          err.local.key,
          "Invalid value, must be an array"
        );
        break;
      case "object.base":
        addErrorMessage(
          newError,
          err.local.type,
          "Invalid value, must contain an object"
        );
        break;
    }
  });
  return new Error(JSON.stringify(newError));
};

// addErrorMessage -`aa
const addErrorMessage = (obj: any, key: string, value: string) => {
  if (!!obj[key]) {
    if (Array.isArray(obj[key]) && !obj[key].includes(value))
      obj[key].push(value);
    else if (obj[key] !== value) obj[key] = [obj[key], value];
  } else obj[key] = value;
  return obj;
};