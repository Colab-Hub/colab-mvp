import { DatabaseHandler } from "@/common/utils/databaseHandler";
import type { User } from "@/api/users/Models/UserModel";
import {SELECT_USER_BY_ID, SELECT_USERS} from "@/api/users/Queries/UsersQueries";
import {ServiceResponse} from "@/common/models/serviceResponse";
export class UsersRepository {
    private databaseHandler: DatabaseHandler;
    
    constructor() {
        this.databaseHandler = new DatabaseHandler();
    }
    
    private mapRowToUser(row: any): User {
        return {
            id: row.id,
            name: row.name,
            surname: row.surname,
            age: row.age,
            areasOfInterest: row.areas_of_interest,
            subscriptionLevel: row.subscription_level,
            subscriptionNewsletter: row.subscription_newsletter,
            subscribedOpportunitiesId: row.subscribed_opportunities_id,
            cellphone: row.cellphone,
            email: row.email,
            password: row.password,
            additionalInfo: row.additional_info,
            isActive: row.is_active,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
        
    public async findAllAsync(): Promise<ServiceResponse<User[] | null>> {
        try {
            const result = await this.databaseHandler.runQuery(SELECT_USERS, []);
            const users = result.rows.map(this.mapRowToUser);
            
            return ServiceResponse.success(`Users finded`, users);
        } catch (error) {
            return ServiceResponse.failure("Error trying to find user", null);
        }
    }
    
    public async findByIdAsync(id: string): Promise<ServiceResponse<User | null>> {
        try {
            const result = await this.databaseHandler.runQuery(SELECT_USER_BY_ID, [id]);
            const user: User = this.mapRowToUser(result.rows[0]);
            
            return ServiceResponse.success(`User finded: ${user.id}`, user);
        } catch (error) {
            return ServiceResponse.failure(`Error finding user: ${id}`, null);
        }
    }
}