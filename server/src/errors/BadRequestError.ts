import { BaseError } from "./BaseError";

export default class BadRequestError extends BaseError {
    constructor(message: string, data?: Record<string, any>) {
        super(message, 400, data);
    }
}