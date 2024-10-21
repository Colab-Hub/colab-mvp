import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { RequestHandler } from "express";
import { authService } from "./authService";

class AuthController {
  public validateToken: RequestHandler = async (req, res) => {
    const token = req.body.token;
    const serviceResponse = await authService.validateToken(token);
    return handleServiceResponse(serviceResponse, res);
  };

  public createToken: RequestHandler = async (req, res) => {
    const serviceResponse = await authService.createToken(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

}

export const authController = new AuthController();
