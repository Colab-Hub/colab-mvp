import { DatabaseHandler } from "@/common/utils/databaseHandler";
import type { User } from "@/api/users/Models/UserModel";
import {
    INSERT_USER,
    SELECT_USER_BY_ID,
    SELECT_USERS,
    DELETE_USER
} from "@/api/users/Queries/UsersQueries";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {v4 as uuidv4} from "uuid";

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

    public async createAsync(user: User): Promise<ServiceResponse<User | null>> {
        try {
            const id = uuidv4();
            await this.databaseHandler.runQuery(INSERT_USER, [
                id,
                user.name,
                user.surname,
                user.age,
                user.areasOfInterest,
                user.subscriptionLevel,
                user.subscriptionNewsletter,
                user.subscribedOpportunitiesId,
                user.cellphone,
                user.email,
                user.password,
                user.additionalInfo,
                user.isActive,
                new Date().toISOString(),
                new Date().toISOString()
            ]);
            return ServiceResponse.success(`User·Number:·${id}·Created·successfully`, user);
        } catch (error) {
            console.error("Error creating opportunity:", error);
            return ServiceResponse.failure("Error creating opportunity", null);
        }
    }

    public async updateAsync(
      id: string,
      user: Partial<User>,
    ): Promise<ServiceResponse<User | null>> {
        try {
            const entries = Object.entries(user).filter(([, value]) => value !== undefined);

            if (entries.length === 0) {
                return ServiceResponse.failure("No fields to update", null);
            }

            const fieldsToUpdate = entries.map(([key], index) => `${key} = $${index + 1}`);
            fieldsToUpdate.push(`updated_at = $${entries.length + 1}`);
            const values = entries.map(([, value]) => value);
            values.push(new Date().toISOString());
            values.push(id);

            const updateQuery = `
                UPDATE users
                SET ${fieldsToUpdate.join(", ")}
                WHERE id = $${values.length}
            RETURNING *;
        `;

            const result = await this.databaseHandler.runQuery(updateQuery, values);

            return ServiceResponse.success("User updated successfully", result.rows[0]);
        } catch (error) {
            console.error("Error updating user:", error);
            return ServiceResponse.failure("Error updating user", null);
        }
    }

    public async deleteByIdAsync(id: string): Promise<ServiceResponse<boolean>> {
        try {
            const result = await this.databaseHandler.runQuery(DELETE_USER, [id]);

            if (result.rows.length === 0) {
                return ServiceResponse.failure("User not found", false);
            }

            return ServiceResponse.success("User deleted successfully", true);
        } catch (error) {
            console.error("Error deleting user:", error);
            return ServiceResponse.failure("Error deleting user", false);
        }
    }
    
}