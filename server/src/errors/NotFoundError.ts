import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message) {
        super(message = "not found", 404);
    }
}