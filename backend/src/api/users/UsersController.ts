import { UsersService } from "@/api/users/UsersService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { RequestHandler } from "express";
import {OpportunitiesController} from "@/api/opportunities/OpportunitiesController";

class UsersController {
  private usersService: UsersService;
  
    constructor() {
        this.usersService = new UsersService();
    }
  
  public getUsers: RequestHandler = async (_req, res) => {
    const serviceResponse = await this.usersService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UsersController();
