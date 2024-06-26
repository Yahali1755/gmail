import { BaseError } from "./BaseError";

export default class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, 401);
    }
}