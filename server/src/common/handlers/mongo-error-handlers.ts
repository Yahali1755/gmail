import { Error } from "mongoose";
import { ErrorRequestHandler } from "express-serve-static-core";
import BadRequestError from "../../errors/BadRequestError";

const DUPLICATE_KEY_ERROR_CODE = 11000

export const handleMongoUpdateError: ErrorRequestHandler = (error, req, res, next) => {
  if (error.code === DUPLICATE_KEY_ERROR_CODE || error instanceof Error.ValidationError) {
    next(new BadRequestError(error.message))
  }
  
  if (error instanceof Error.CastError) {
    next(new BadRequestError("Invalid id"))
  }
  
  next(error);
}