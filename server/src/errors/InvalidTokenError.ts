import { CustomError } from "./CustomError";

export class InvalidTokenError extends CustomError {
    constructor() {
        super("Unauthorized - Invalid token", 401);
    }
}