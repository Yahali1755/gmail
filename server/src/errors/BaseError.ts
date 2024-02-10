export class BaseError extends Error {
    status: number;
    data: Record<string, any>

    constructor(message: any, status: number, data?: Record<string, any>) {
        super(message);
        
        this.status = status
        this.data = data;
    }
}