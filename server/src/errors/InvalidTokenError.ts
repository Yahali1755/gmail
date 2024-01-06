import { BaseError } from "./BaseError";

export class InvalidTokenError extends BaseError {
    constructor() {
        super("Unauthorized - Invalid token", 401);
    }
}