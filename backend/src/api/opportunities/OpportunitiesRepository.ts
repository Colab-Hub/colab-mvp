import type { Opportunity } from "@/api/opportunities/OpportunitiesModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { DatabaseHandler } from "@/common/utils/databaseHandler";
import { v4 as uuidv4 } from "uuid";
import {
  DELETE_OPPORTUNITY,
  INSERT_OPPORTUNITY,
  SELECT_OPPORTUNITIES,
  SELECT_OPPORTUNITY_BY_ID,
} from "./queries/OpportunitiesQueries";

export class OpportunitiesRepository {
  private databaseHandler: DatabaseHandler;

  constructor() {
    this.databaseHandler = new DatabaseHandler();
  }

  private mapRowToOpportunity(row: any): Opportunity {
    return {
      id: row.id,
      title: row.title,
      type: row.type,
      description: row.description,
      startDate: row.start_date,
      endDate: row.end_date,
      location: row.location,
      isRemote: row.is_remote,
      isPaid: row.is_paid,
      contractType: row.contract_type,
      activityArea: row.activity_area,
      experienceLevel: row.experience_level,
      requiredSkills: row.required_skills,
      timeCommitment: row.time_commitment,
      languages: row.languages,
      feedbackTime: row.feedback_time,
      applicantsEmails: row.applicants_emails,
      howManyApplicants: row.how_many_applicants,
      hirerEmail: row.hirer_email,
      hirerName: row.hirer_name,
      hirerPhone: row.hirer_phone,
      hirerCompany: row.hirer_company,
      hirerCompanyWebsite: row.hirer_company_website,
      hirerCompanyLogo: row.hirer_company_logo,
      areasOfInterest: row.areas_of_interest,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      additionalInfo: row.additional_info,
      _applicantsEmails: row.applicants_emails,
      _howManyApplicants: row.how_many_applicants,
      isActive: row.is_active,
    };
  }

  public async findAllAsync(): Promise<ServiceResponse<Opportunity[]>> {
    try {
      const result = await this.databaseHandler.runQuery(SELECT_OPPORTUNITIES, []);
      const opportunities = result.rows.map(this.mapRowToOpportunity);
      return ServiceResponse.success("Opportunities found successfully", opportunities);
    } catch (error) {
      console.error("Error finding opportunities:", error);
      return ServiceResponse.failure("Error finding opportunities", []);
    }
  }

  public async findByIdAsync(id: string): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const result = await this.databaseHandler.runQuery(SELECT_OPPORTUNITY_BY_ID, [id]);
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
      const id = uuidv4();
      await this.databaseHandler.runQuery(INSERT_OPPORTUNITY, [
        id,
        opportunity.title,
        opportunity.type,
        opportunity.description,
        opportunity.startDate,
        opportunity.endDate,
        opportunity.location,
        opportunity.isRemote,
        opportunity.isPaid,
        opportunity.contractType,
        opportunity.activityArea,
        opportunity.experienceLevel,
        opportunity.requiredSkills,
        opportunity.timeCommitment,
        opportunity.languages,
        opportunity.feedbackTime,
        opportunity.applicantsEmails,
        opportunity.howManyApplicants,
        opportunity.hirerEmail,
        opportunity.hirerName,
        opportunity.hirerPhone,
        opportunity.hirerCompany,
        opportunity.hirerCompanyWebsite,
        opportunity.hirerCompanyLogo,
        new Date().toISOString(),
        new Date().toISOString(),
        opportunity.additionalInfo,
        opportunity.isActive,
      ]);
      return ServiceResponse.success(`Opportunity·Number:·${id}·Created·successfully`, opportunity);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      return ServiceResponse.failure("Error creating opportunity", null);
    }
  }

  public async updateAsync(
    id: string,
    opportunity: Partial<Opportunity>,
  ): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const entries = Object.entries(opportunity).filter(([, value]) => value !== undefined);

      if (entries.length === 0) {
        return ServiceResponse.failure("No fields to update", null);
      }

      const fieldsToUpdate = entries.map(([key], index) => `${key} = $${index + 1}`);
      fieldsToUpdate.push(`updated_at = $${entries.length + 1}`);
      const values = entries.map(([, value]) => value);
      values.push(new Date().toISOString());
      values.push(id);


      const updateQuery = `
        UPDATE opportunities
        SET ${fieldsToUpdate.join(", ")}
        WHERE id = $${values.length}
        RETURNING *;
        `;

      const result = await this.databaseHandler.runQuery(updateQuery, values);

      return ServiceResponse.success("Opportunity updated successfully", result.rows[0]);
    } catch (error) {
      console.error("Error updating opportunity:", error);
      return ServiceResponse.failure("Error updating opportunity", null);
    }
  }

  public async deleteByIdAsync(id: string): Promise<ServiceResponse<boolean>> {
    try {
      const result = await this.databaseHandler.runQuery(DELETE_OPPORTUNITY, [id]);

      if (result.rows.length === 0) {
        return ServiceResponse.failure("Opportunity not found", false);
      }

      return ServiceResponse.success("Opportunity deleted successfully", true);
    } catch (error) {
      console.error("Error deleting opportunity:", error);
      return ServiceResponse.failure("Error deleting opportunity", false);
    }
  }
}
