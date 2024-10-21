import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { AuthRepository } from "./authRepository";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async validateToken(token: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = this.authRepository.validateToken(token);
      return response;
    } catch (error) {
      const errorMessage = `Error during token validation: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure<boolean>(
        "An error occurred while validating token.",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createToken(createInfo: object): Promise<ServiceResponse<string>> {
    try {
      const response = this.authRepository.createToken(createInfo);
      return response;
    } catch (error) {
      const errorMessage = `Error during token creation: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure<string>(
        "An error occurred while creating token.",
        "",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

}

export const authService = new AuthService();
