import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { RequestHandler } from "express";
import { clientService } from "./clientService";

class ClientController {
  public getClients: RequestHandler = async (_req, res) => {
    const serviceResponse = await clientService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getClient: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const serviceResponse = await clientService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const clientController = new ClientController();
