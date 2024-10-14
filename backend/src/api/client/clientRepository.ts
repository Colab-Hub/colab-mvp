import { DatabaseHandler, databaseHandler } from "@/common/utils/databaseHandler";
import { Client } from "./clientModel";

export class ClientRepository {
  private databaseHandler: DatabaseHandler;

  constructor() {
    this.databaseHandler = databaseHandler;
  }

  async findAllAsync(): Promise<Client[]> {
    try {
      const result = await this.databaseHandler.runQuery("SELECT * FROM clients", []);
      const clients: Client[] = result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
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
      }));
      console.log('Clients found:', clients);
      return clients;
    } catch (error) {
      throw error;
    }
  }
}