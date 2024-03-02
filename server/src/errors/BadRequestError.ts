import { BaseError } from "./BaseError";

export default class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}