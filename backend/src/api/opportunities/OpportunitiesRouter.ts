import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  GetOpportunitiesSchema,
  OpportunitiesSchema,
  PostOpportunitiesSchema,
} from "@/api/opportunities/OpportunitiesModel";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { any, unknown, z} from "zod";
import { opportunitiesController } from "@/api/opportunities/OpportunitiesController";

export const opportunitiesRegistry = new OpenAPIRegistry();
export const opportunitiesRouter: Router = express.Router();

opportunitiesRegistry.register("Opportunities", OpportunitiesSchema);

opportunitiesRegistry.registerPath({
  method: "get",
  path: "/opportunities",
  tags: ["Opportunities"],
  responses: createApiResponse(z.array(GetOpportunitiesSchema), "Success"),
});
opportunitiesRouter.get("/", opportunitiesController.getOpportunities);

opportunitiesRegistry.registerPath({
  method: "get",
  path: "/opportunities/{id}",
  tags: ["Opportunities"],
  responses: createApiResponse(GetOpportunitiesSchema, "Success"),
});
opportunitiesRouter.get("/:id", opportunitiesController.getOpportunity);

opportunitiesRegistry.registerPath({
  method: "post",
  path: "/opportunities",
  tags: ["Opportunities"],
  requestBody: { content: { "application/json": { schema: undefined } } },
  responses: createApiResponse(PostOpportunitiesSchema, "Success"),
});
opportunitiesRouter.post("/", opportunitiesController.createOpportunity);

opportunitiesRegistry.registerPath({
  method: "put",
  path: "/opportunities/{id}",
  tags: ["Opportunities"],
  responses: createApiResponse(PostOpportunitiesSchema, "Success"),
});
opportunitiesRouter.put("/:id", opportunitiesController.updateOpportunity);

opportunitiesRegistry.registerPath({
  method: "delete",
  path: "/opportunities/{id}",
  tags: ["Opportunities"],
  responses: createApiResponse(PostOpportunitiesSchema, "Success"),
});
opportunitiesRouter.delete("/:id", opportunitiesController.deleteOpportunity);
