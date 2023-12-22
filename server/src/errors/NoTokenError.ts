import { CustomError } from "./CustomError";

export class NoTokenError extends CustomError {
    constructor() {
        super("Unauthorized - No token provided", 401);
    }
}