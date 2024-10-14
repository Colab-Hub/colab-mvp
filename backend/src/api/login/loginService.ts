import { ServiceResponse } from "@/common/models/serviceResponse";
import { Login } from "./loginModel";
import { ClientRepository } from "../client/clientRepository";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import jwt from "jsonwebtoken";
import { Client } from "../client/clientModel";
import { LoginRepository } from "./loginRepository";

export class LoginService {
  private clientRepository: ClientRepository;
  private loginRepository: LoginRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
    this.loginRepository = new LoginRepository();
  }

  public async login(login: Login): Promise<ServiceResponse<string | null>> {
    try {
      const loginResponse: ServiceResponse<Login | null> = await this.loginRepository.loginAsync(login);
      if (loginResponse.success) {
        const auth = {
          secret: String(process.env.SECRET),
          expires: '1h',
        };

        const token = jwt.sign({ email: login.email }, auth.secret, { expiresIn: auth.expires });

        return ServiceResponse.success<string | null>("Login successful", token, StatusCodes.OK);
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
      const signupResponse: ServiceResponse<Client | null> = await this.clientRepository.createAsync(client)
      console.log(signupResponse);
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