import { opportunitiesController } from "@/api/opportunities/OpportunitiesController";
import { opportunitiesService } from "@/api/opportunities/OpportunitiesService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, Response } from "express";

vi.mock("@/api/opportunities/OpportunitiesService");
vi.mock("@/common/utils/httpHandlers");

describe("OpportunitiesController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockHandleServiceResponse: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockHandleServiceResponse = handleServiceResponse as vi.Mock;
  });

  it("should return a list of opportunities", async () => {
    const mockOpportunities = [{ id: 1, name: "Opportunity 1" }];
    (opportunitiesService.findAll as vi.Mock).mockResolvedValue(mockOpportunities);

    await opportunitiesController.getOpportunities(req as Request, res as Response);

    expect(opportunitiesService.findAll).toHaveBeenCalled();
    expect(mockHandleServiceResponse).toHaveBeenCalledWith(mockOpportunities, res);
  });

  it("should return an opportunity by id", async () => {
    const mockOpportunity = { id: 1, name: "Opportunity 1" };
    (opportunitiesService.findById as vi.Mock).mockResolvedValue(mockOpportunity);
    req.params = { id: 1 };

    await opportunitiesController.getOpportunity(req as Request, res as Response);

    expect(opportunitiesService.findById).toHaveBeenCalledWith(1);
    expect(mockHandleServiceResponse).toHaveBeenCalledWith(mockOpportunity, res);
  });

  it("should create an opportunity", async () => {
    const mockOpportunity = { id: 1, name: "Opportunity 1" };
    (opportunitiesService.create as vi.Mock).mockResolvedValue(mockOpportunity);
    req.body = mockOpportunity;

    await opportunitiesController.createOpportunity(req as Request, res as Response);

    expect(opportunitiesService.create).toHaveBeenCalledWith(mockOpportunity);
    expect(mockHandleServiceResponse).toHaveBeenCalledWith(mockOpportunity, res);
  });

  it("should update an opportunity", async () => {
    const mockOpportunity = { id: 1, name: "Opportunity 1" };
    (opportunitiesService.update as vi.Mock).mockResolvedValue(mockOpportunity);
    req.params = { id: 1 };
    req.body = mockOpportunity;

    await opportunitiesController.updateOpportunity(req as Request, res as Response);

    expect(opportunitiesService.update).toHaveBeenCalledWith(1, mockOpportunity);
    expect(mockHandleServiceResponse).toHaveBeenCalledWith(mockOpportunity, res);
  });

  it("should delete an opportunity", async () => {
    const mockOpportunity = { id: 1, name: "Opportunity 1" };
    (opportunitiesService.deleteById as vi.Mock).mockResolvedValue(mockOpportunity);
    req.params = { id: 1 };

    await opportunitiesController.deleteOpportunity(req as Request, res as Response);

    expect(opportunitiesService.deleteById).toHaveBeenCalledWith(1);
    expect(mockHandleServiceResponse).toHaveBeenCalledWith(mockOpportunity, res);
  });
});
