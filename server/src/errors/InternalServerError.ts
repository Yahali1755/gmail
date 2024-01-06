import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    constructor() {
        super("Internal server error", 500);
    }
}