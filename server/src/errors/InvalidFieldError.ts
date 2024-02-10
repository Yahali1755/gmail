import { BaseError } from "./BaseError";

export default class InvalidFieldError extends BaseError {
    constructor(message: string, data?: Record<string, any>) {
        super(message, 400, data);
    }
}