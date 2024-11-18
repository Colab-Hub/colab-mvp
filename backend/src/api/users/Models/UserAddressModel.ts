import type { UserAdressSchema } from "@/api/users/Schema/UserAdressSchema";

export class UserAddress {
    readonly id: string;
    readonly userId: string;
    readonly zipCode: string;
    readonly street: string;
    readonly number: string;
    readonly complement: string;
    readonly neighborhood: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    
    constructor(init: UserAdressSchema) {
        Object.assign(this as ObjectConstructor, init);
    }
}
