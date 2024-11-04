import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class Opportunity<T = null> {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly areasOfInterest: string[]; // ex.:['marketing', 'developmet', 'arts']
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly additionalInfo: string;

    private constructor() {
        // Constructor should not assign non-existent variables
    }

    static success<T>(message: string, responseObject: T, statusCode: number = StatusCodes.OK) {
        return new ServiceResponse(true, message, responseObject, statusCode);
    }

    static failure<T>(message: string, responseObject: T, statusCode: number = StatusCodes.BAD_REQUEST) {
        return new ServiceResponse(false, message, responseObject, statusCode);
    }
}

class ServiceResponse<T> {
    constructor(
        public success: boolean,
        public message: string,
        public responseObject: T,
        public statusCode: number
    ) {}
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        message: z.string(),
        responseObject: dataSchema.optional(),
        statusCode: z.number(),
    });