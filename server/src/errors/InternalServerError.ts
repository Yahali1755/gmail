import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
    constructor() {
        super("Internal server error", 500);
    }
}