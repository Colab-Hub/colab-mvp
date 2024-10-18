import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import type { Client } from "../client/clientModel";
import { ClientRepository } from "../client/clientRepository";
import type { Login } from "./loginModel";
import { LoginRepository } from "./loginRepository";

interface JWToken {
  email: string;
  clientId: string;
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
        const auth = {
          secret: String(process.env.SECRET),
          expires: "1h",
        };

        if (this.isLoginResponseWithId(loginResponse.responseObject)) {
          const { id, email } = loginResponse.responseObject;
          const tokenPayload: JWToken = { clientId: id, email };
          const token = jwt.sign(tokenPayload, auth.secret, { expiresIn: auth.expires });

          return ServiceResponse.success<string | null>("Login successful", token, StatusCodes.OK);
        } else {
          return ServiceResponse.failure<string | null>(
            "Invalid login response structure.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
          );
        }
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

  public isLoginResponseWithId(obj: any): obj is { id: string; email: string } {
    return obj && typeof obj.id === "string" && typeof obj.email === "string";
  }

  public async signup(client: Client): Promise<ServiceResponse<string | null>> {
    try {
      const signupResponse: ServiceResponse<Client | null> = await this.clientRepository.createAsync(client);
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
