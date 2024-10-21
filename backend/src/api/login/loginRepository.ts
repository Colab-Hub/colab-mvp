import { ServiceResponse } from "@/common/models/serviceResponse";
import { type DatabaseHandler, databaseHandler } from "@/common/utils/databaseHandler";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import type { Login } from "./loginModel";

const SELECT_USER_BY_EMAIL = "SELECT id, email, password FROM clients WHERE email = $1";

interface loginRepositoryResponse {
  id: string;
  email: string;
}

export class LoginRepository {
  private databaseHandler: DatabaseHandler;

  constructor() {
    this.databaseHandler = databaseHandler;
  }

  public async loginAsync(login: Login): Promise<ServiceResponse<Login | null>> {
    try {
      const loginResponse: ServiceResponse<any> = await this.matchEmailAndPassword(login.email, login.password);
      if (loginResponse.success) {
        return ServiceResponse.success<Login | null>("Login successful", loginResponse.responseObject, StatusCodes.OK);
      } else {
        return ServiceResponse.failure(
          loginResponse.message || "Login failed",
          null,
          loginResponse.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log("Error during login: ", (error as Error).message);
      return ServiceResponse.failure("An error occurred while logging in.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async matchEmailAndPassword(email: string, password: string): Promise<ServiceResponse<loginRepositoryResponse | null>> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return ServiceResponse.failure("Invalid password", null, StatusCodes.UNAUTHORIZED);
      }
      const loginData = { id: user.id, email: user.email };
      return ServiceResponse.success<loginRepositoryResponse>("Password match", loginData, StatusCodes.OK);
    } catch (error) {
      console.log("Error matching email and password: ", (error as Error).message);
      return ServiceResponse.failure(
        "An error occurred while matching email and password.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findByEmail(email: string): Promise<any> {
    try {
      const result = await this.databaseHandler.runQuery(SELECT_USER_BY_EMAIL, [email]);
      return result.rows[0];
    } catch (error) {
      console.log("Error finding user by email: ", (error as Error).message);
      return null;
    }
  }
}
