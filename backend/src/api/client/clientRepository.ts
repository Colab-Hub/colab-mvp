import { ServiceResponse } from "@/common/models/serviceResponse";
import { type DatabaseHandler, databaseHandler } from "@/common/utils/databaseHandler";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import type { Client } from "./clientModel";


export class ClientRepository {
  private databaseHandler: DatabaseHandler;
  private SELECT_CLIENTS = "SELECT * FROM clients";
  private SELECT_CLIENT_BY_ID = "SELECT * FROM clients WHERE id = $1";
  private INSERT_CLIENT = `
      INSERT INTO clients (
        id, name, password, surname, age, areas_of_interest, address_zip_code, address_street, address_city, address_state, address_number, address_complement, is_active, subscription_level, cellphone, email, additional_info, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
      ) RETURNING *`;
  constructor() {
    this.databaseHandler = databaseHandler;
  }

  private mapRowToClient(row: any): Client {
    return {
      id: row.id,
      name: row.name,
      password: row.password,
      surname: row.surname,
      age: row.age,
      areasOfInterest: row.areas_of_interest,
      address: {
        zipCode: row.address_zip_code,
        street: row.address_street,
        city: row.address_city,
        state: row.address_state,
        number: row.address_number,
        complement: row.address_complement,
      },
      isActive: row.is_active,
      subscriptionLevel: row.subscription_level,
      cellphone: row.cellphone,
      email: row.email,
      additionalInfo: row.additional_info,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findAllAsync(): Promise<Client[]> {
    try {
      const result = await this.databaseHandler.runQuery(this.SELECT_CLIENTS, []);
      return result.rows.map(this.mapRowToClient);
    } catch (error) {
      console.error("Error finding clients:", error);
      return [];
    }
  }

  async findByIdAsync(id: string): Promise<Client | null> {
    try {
      const result = await this.databaseHandler.runQuery(this.SELECT_CLIENT_BY_ID, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return this.mapRowToClient(result.rows[0]);
    } catch (error) {
      console.error("Error finding client by ID:", error);
      return null;
    }
  }

  async createAsync(client: Client): Promise<ServiceResponse<Client | null>> {
    try {
      const hashedPassword = await bcrypt.hash(client.password, 10);
      const result = await this.databaseHandler.runQuery(this.INSERT_CLIENT, [
        uuidv4(),
        client.name,
        hashedPassword,
        client.surname,
        client.age,
        client.areasOfInterest,
        client.address.zipCode,
        client.address.street,
        client.address.city,
        client.address.state,
        client.address.number,
        client.address.complement,
        client.isActive,
        client.subscriptionLevel,
        client.cellphone,
        client.email,
        client.additionalInfo,
        new Date().toISOString(),
        new Date().toISOString(),
      ]);
      const clientResponse = this.mapRowToClient(result.rows[0]);
      return ServiceResponse.success<Client | null>("Login successful", clientResponse, StatusCodes.OK);
    } catch (error) {
      console.log("Error creating client: ", (error as Error).message);
      return ServiceResponse.failure("An error occurred while logging in.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
