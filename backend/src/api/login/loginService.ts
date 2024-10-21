import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { authService } from "../auth/authService";
import type { Client } from "../client/clientModel";
import { ClientRepository } from "../client/clientRepository";
import type { Login } from "./loginModel";
import { LoginRepository } from "./loginRepository";

interface JWToken {
  id: string;
  email: string;
}

export class LoginService {
  private clientRepository: ClientRepository;
  private loginRepository: LoginRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
    this.loginRepository = new LoginRepository();
  }

  public async login(login: Login): Promise<ServiceResponse<string | null>> {
    try {
      const loginResponse: ServiceResponse<Login | null | JWToken> = await this.loginRepository.loginAsync(login);

      if (loginResponse.success && loginResponse.responseObject) {
        const tokenResponse = await authService.createToken(loginResponse.responseObject as JWToken);
        return ServiceResponse.success<string | null>(
          tokenResponse.responseObject,
          null,
          StatusCodes.OK,
        );
      } else {
        return ServiceResponse.failure<string | null>(
          loginResponse.message || "Login failed",
          null,
          loginResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      const errorMessage = `Error during login: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure<string | null>(
        "An error occurred while logging in.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async signup(client: Client): Promise<ServiceResponse<string | null>> {
    try {
      const signupResponse: ServiceResponse<Client | null> = await this.clientRepository.createAsync(client);
      if (signupResponse.success) {
        return ServiceResponse.success<string | null>("Signup successful", null, StatusCodes.OK);
      } else {
        return ServiceResponse.failure<string | null>(
          signupResponse.message || "Signup failed",
          null,
          signupResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      const errorMessage = `Error during signup: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure<string | null>(
        "An error occurred while signing up.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const loginService = new LoginService();
