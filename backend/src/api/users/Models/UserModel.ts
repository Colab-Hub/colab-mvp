import type { UserSchema } from "@/api/Users/schema/UserSchema";

export class User {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly age: string;
    readonly areasOfInterest: string[];
    readonly subscriptionLevel: string;
    readonly subscriptionNewsletter: boolean;
    readonly subscribedOpportunitiesId: string[];
    readonly cellphone: string;
    readonly email: string;
    readonly password: string;
    readonly additionalInfo: string;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    
    constructor(init: UserSchema) {
        Object.assign(this as ObjectConstructor, init);
    }
}
