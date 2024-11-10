import type { Opportunity } from "@/api/opportunities/OpportunitiesModel";
import { OpportunitiesRepository } from "@/api/opportunities/OpportunitiesRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

export class OpportunitiesService {
  private opportunitiesRepository: OpportunitiesRepository;
  constructor() {
    this.opportunitiesRepository = new OpportunitiesRepository();
  }

  public async findAll(): Promise<ServiceResponse<Opportunity[]>> {
    try {
      const opportunitiesResponse = await this.opportunitiesRepository.findAllAsync();
      if (opportunitiesResponse.success) {
        const opportunities = opportunitiesResponse.responseObject;
        return ServiceResponse.success<Opportunity[]>("Opportunities found", opportunities);
      } else {
        return ServiceResponse.failure<Opportunity[]>(
          opportunitiesResponse.message || "Opportunities not found",
          [],
          opportunitiesResponse.statusCode || StatusCodes.NOT_FOUND,
        );
      }
    } catch (error) {
      const errorMessage = `Error finding all opportunities: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving opportunities.",
        [],
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findById(id: string): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const opportunityResponse = await this.opportunitiesRepository.findByIdAsync(id);
      if (opportunityResponse.success) {
        const opportunity = opportunityResponse.responseObject;
        return ServiceResponse.success<Opportunity | null>("Opportunity found", opportunity);
      } else {
        return ServiceResponse.failure<Opportunity | null>(
          opportunityResponse.message || "Opportunity not found",
          null,
          opportunityResponse.statusCode || StatusCodes.NOT_FOUND,
        );
      }
    } catch (error) {
      const errorMessage = `Error finding opportunity with id ${id}: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding opportunity.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async create(opportunity: Opportunity): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const newOpportunityResponse: ServiceResponse<Opportunity | null> =
        await this.opportunitiesRepository.createAsync(opportunity);
      if (newOpportunityResponse.success) {
        const newOpportunity = newOpportunityResponse.responseObject;
        return ServiceResponse.success<Opportunity | null>(
          "Opportunity created successfully",
          newOpportunity,
          StatusCodes.CREATED,
        );
      } else {
        return ServiceResponse.failure<Opportunity | null>(
          newOpportunityResponse.message || "Opportunity creation failed",
          null,
          newOpportunityResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      const errorMessage = `Error during opportunity creation: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure<Opportunity | null>(
        "An error occurred while creating the opportunity.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(opId: string, opportunity: Opportunity): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const updatedOpportunityResponse: ServiceResponse<Opportunity | null> =
        await this.opportunitiesRepository.updateAsync(opId, opportunity);
      if (updatedOpportunityResponse.success) {
        const updatedOpportunity = updatedOpportunityResponse.responseObject;
        return ServiceResponse.success<Opportunity | null>("Opportunity updated successfully", updatedOpportunity);
      } else {
        return ServiceResponse.failure<Opportunity | null>(
          updatedOpportunityResponse.message || "Opportunity update failed",
          null,
          updatedOpportunityResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      const errorMessage = `Error during opportunity update: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure<Opportunity | null>(
        "An error occurred while updating the opportunity.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteById(id: string): Promise<ServiceResponse<Opportunity | null>> {
    try {
      const deleteResponse = await this.opportunitiesRepository.deleteByIdAsync(id);
      if (deleteResponse.success) {
        return ServiceResponse.success("Opportunity deleted successfully", deleteResponse.responseObject);
      } else {
        return ServiceResponse.failure(
          deleteResponse.message || "Opportunity deletion failed",
          null,
          deleteResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      const errorMessage = `Error during opportunity deletion: ${(error as Error).message}`;
      console.log(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while deleting the opportunity.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const opportunitiesService = new OpportunitiesService();
