import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { RequestHandler } from "express";
import { opportunitiesService } from "@/api/opportunities/OpportunitiesService";

export class OpportunitiesController {
  public getOpportunities: RequestHandler = async (_req, res) => {
    const serviceResponse = await opportunitiesService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getOpportunity: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const serviceResponse = await opportunitiesService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createOpportunity: RequestHandler = async (req, res) => {
    const serviceResponse = await opportunitiesService.create(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public updateOpportunity: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const serviceResponse = await opportunitiesService.update(id, req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteOpportunity: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const serviceResponse = await opportunitiesService.deleteById(id);
    return handleServiceResponse(serviceResponse, res);
  };

}

export const opportunitiesController = new OpportunitiesController();
