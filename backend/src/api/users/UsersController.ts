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
    
  public getUserById: RequestHandler = async (req, res) => {
      const serviceResponse = await this.usersService.findById(req.params.id);
      return handleServiceResponse(serviceResponse, res);
  }
  
  public createUser: RequestHandler = async (req, res) => {
    const serviceResponse = await this.usersService.create(req.body);
    return handleServiceResponse(serviceResponse, res);
  }
    
  public updateUser: RequestHandler = async (req, res) => {
      const serviceResponse = await this.usersService.update(req.params.id, req.body);
      return handleServiceResponse(serviceResponse, res);
  }
  
  public deleteUser: RequestHandler = async (req, res) => {
      const serviceResponse = await this.usersService.deleteById(req.params.id);
      return handleServiceResponse(serviceResponse, res);
  }
    
}

export const userController = new UsersController();
