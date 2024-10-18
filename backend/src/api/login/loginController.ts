import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { RequestHandler } from "express";
import { loginService } from "./loginService";

class LoginController {
  public login: RequestHandler = async (req, res) => {
    const serviceResponse = await loginService.login(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public signup: RequestHandler = async (req, res) => {
    const serviceResponse = await loginService.signup(req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const loginController = new LoginController();
