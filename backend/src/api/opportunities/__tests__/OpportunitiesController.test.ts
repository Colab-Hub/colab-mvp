import { opportunitiesService } from "@/api/opportunities/OpportunitiesService";
import { app } from "@/server";
import request from "supertest";

jest.mock("@/api/opportunities/OpportunitiesService", () => ({
  getOpportunities: jest.fn().mockResolvedValue(undefined as never),
  getOpportunity: jest.fn().mockResolvedValue(undefined as never),
  createOpportunity: jest.fn().mockResolvedValue(undefined as never),
  updateOpportunity: jest.fn().mockResolvedValue(undefined as never),
  deleteOpportunity: jest.fn().mockResolvedValue(undefined as never),
}));

describe("OpportunitiesController", () => {
  it("should return a list of opportunities", async () => {
    const response = await request(app).get("/opportunities");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
