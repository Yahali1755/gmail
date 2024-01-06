import { BaseError } from "./BaseError";

export class NoTokenError extends BaseError {
    constructor() {
        super("Unauthorized - No token provided", 401);
    }
}