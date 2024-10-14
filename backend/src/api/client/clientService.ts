import { StatusCodes } from "http-status-codes";

import type { Client } from "@/api/client/clientModel"
import { ClientRepository } from "./clientRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class ClientService {
  private clientRepository: ClientRepository;

  constructor(repository: ClientRepository = new ClientRepository()) {
    this.clientRepository = repository;
  }

  public async findAll(): Promise<ServiceResponse<Client[] | null>> {
    try {
      const clients = await this.clientRepository.findAllAsync();
      if (!clients || clients.length === 0) {
        return ServiceResponse.failure("No Clients found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Client[]>("Clients found", clients);
    } catch (error) {
      const errorMessage = 'Error finding all clients: ${(error as Error).message}';
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving clients.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const clientService = new ClientService();
