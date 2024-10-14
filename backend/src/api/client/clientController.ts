import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { RequestHandler } from "express";
import { clientService } from "./clientService";

class ClientController {
  public getClients: RequestHandler = async (_req, res) => {
    const serviceResponse = await clientService.findAll();
    return handleServiceResponse(serviceResponse, res);
  }
}

export const clientControler = new ClientController();