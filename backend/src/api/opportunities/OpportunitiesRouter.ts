import express, {Router} from "express";
import {opportunitiesController} from "./OpportunitiesController";
import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {z} from "zod";
import {
    GetOpportunitiesSchema,
    OpportunitiesSchema,
    PostOpportunitiesSchema
} from "@/api/opportunities/OpportunitiesModel";
import {GetClientsSchema, PostClientSchema} from "@/api/client/clientModel";

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
    requestBody: { content: { "application/json": { schema: PostOpportunitiesSchema } } },
    responses: createApiResponse(PostClientSchema, "Success"),
});
opportunitiesRouter.post("/", opportunitiesController.createClient);
    
opportunitiesRegistry.registerPath({
    method: "put",
    path: "/opportunities/{id}",
    tags: ["Opportunities"],
    responses: createApiResponse(PostClientSchema, "Success"),
});
opportunitiesRouter.put("/:id", opportunitiesController.updateOpportunity);

opportunitiesRegistry.registerPath({
    method: "delete",
    path: "/opportunities/{id}",
    tags: ["Opportunities"],
    responses: createApiResponse(PostClientSchema, "Success"),
});
opportunitiesRouter.delete("/:id", opportunitiesController.deleteOpportunity);


