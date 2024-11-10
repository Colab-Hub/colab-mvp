import type { Opportunity } from "@/api/opportunities/OpportunitiesModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { DatabaseHandler } from "@/common/utils/databaseHandler";
import { v4 as uuidv4 } from "uuid";
export class OpportunitiesRepository {
  private databaseHandler: DatabaseHandler;
  private SELECT_OPPORTUNITIES = "SELECT * FROM opportunities";
  private SELECT_OPPORTUNITY_BY_ID = "SELECT * FROM opportunities WHERE id = $1";
  private INSERT_OPPORTUNITY = `
        INSERT INTO opportunities (
            id, title, description, areas_of_interest, additional_info
        ) VALUES (
            $1, $2, $3, $4, $5
        ) RETURNING *
    `;
  private UPDATE_OPPORTUNITY = `
        UPDATE opportunities
        SET title = $1, description = $2, areas_of_interest = $3, additional_info = $4
        WHERE id = $5
        RETURNING *
    `;
  private DELETE_OPPORTUNITY = "DELETE FROM opportunities WHERE id = $1";

  constructor() {
    this.databaseHandler = new DatabaseHandler();
  }

  private mapRowToOpportunity(row: any): Opportunity {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      areasOfInterest: row.areas_of_interest,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      additionalInfo: row.additional_info,
    };
  }

  public async findAllAsync(): Promise<ServiceResponse<Opportunity[]>> {
    try {
      const result = await this.databaseHandler.runQuery(this.SELECT_OPPORTUNITIES, []);
      const opportunities = result.rows.map(this.mapRowToOpportunity);
      return ServiceResponse.success("Opportunities found successfully", opportunities);
    } catch (error) {
      console.error("Error finding opportunities:", error);
      return ServiceResponse.failure("Error finding opportunities", []);
    }
  }

  public async findByIdAsync(id: string): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const result = await this.databaseHandler.runQuery(this.SELECT_OPPORTUNITY_BY_ID, [id]);
      if (result.rows.length === 0) {
        return ServiceResponse.failure("Opportunity not found", null);
      }
      const opportunity = this.mapRowToOpportunity(result.rows[0]);
      return ServiceResponse.success("Opportunity found successfully", opportunity);
    } catch (error) {
      console.error("Error finding opportunity by ID:", error);
      return ServiceResponse.failure("Error finding opportunity by ID", null);
    }
  }

  public async createAsync(opportunity: Opportunity): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const result = await this.databaseHandler.runQuery(this.INSERT_OPPORTUNITY, [
        uuidv4(),
        opportunity.title,
        opportunity.description,
        opportunity.areasOfInterest,
        opportunity.additionalInfo,
      ]);
      console.log("result", result);
      return ServiceResponse.success("Opportunity created successfully", opportunity);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      return ServiceResponse.failure("Error creating opportunity", null);
    }
  }

  public async updateAsync(id: string, opportunity: Opportunity): Promise<ServiceResponse<Opportunity | null>> {
    try {
      console.log("opportunity", opportunity);
      console.log("id", id);
      const result = await this.databaseHandler.runQuery(this.UPDATE_OPPORTUNITY, [
        opportunity.title,
        opportunity.description,
        opportunity.areasOfInterest,
        opportunity.additionalInfo,
        id,
      ]);
      return ServiceResponse.success("Opportunity updated successfully", result.rows[0]);
    } catch (error) {
      console.error("Error updating opportunity:", error);
      return ServiceResponse.failure("Error updating opportunity", null);
    }
  }

  public async deleteByIdAsync(id: string): Promise<ServiceResponse> {
    try {
      await this.databaseHandler.runQuery(this.DELETE_OPPORTUNITY, [id]);
      return ServiceResponse.success("Opportunity deleted successfully", null);
    } catch (error) {
      console.error("Error deleting opportunity:", error);
      return ServiceResponse.failure("Error deleting opportunity", null);
    }
  }
}
