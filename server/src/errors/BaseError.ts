export class BaseError extends Error {
    status: number;
    data: Record<string, any>

    constructor(message: any, status: number) {
        super(message);
        
        this.status = status
    }
}