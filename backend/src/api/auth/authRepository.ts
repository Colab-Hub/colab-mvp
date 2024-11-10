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
  public createToken(createInfo: object): ServiceResponse<string> {
    try {
      const token = jwt.sign(createInfo, process.env.SECRET || "", {
        expiresIn: "1h",
      });
      return ServiceResponse.success("Token created successfully", token, StatusCodes.OK);
    } catch (error) {
      console.log("Error creating token: ", (error as Error).message);
      return ServiceResponse.failure("Error creating token", "", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
