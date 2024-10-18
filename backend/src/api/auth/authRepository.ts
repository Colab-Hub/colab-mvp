import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthRepository {
  public validateToken(token: string): ServiceResponse<boolean> {
    try {
      jwt.verify(token, process.env.SECRET || "");
      return ServiceResponse.success("Token is valid", true, StatusCodes.OK);
    } catch (error) {
      console.log("Error validating token: ", (error as Error).message);
      return ServiceResponse.failure("Invalid token", false, StatusCodes.UNAUTHORIZED);
    }
  }
}
