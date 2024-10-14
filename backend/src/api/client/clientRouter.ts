import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { ClientSchema, GetClientsSchema, PostClientSchema } from "./clientModel";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validadePostRequest, validateGetRequest } from "@/common/utils/httpHandlers";
import { clientController } from "./clientController";

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRegistry.register("Client", ClientSchema);

clientRegistry.registerPath({
  method: "get",
  path: "/clients",
  tags: ["Client"],
  responses: createApiResponse(z.array(GetClientsSchema), "Success"),
});
clientRouter.get("/", clientController.getClients);

clientRegistry.registerPath({
  method: "get",
  path: "/clients/{id}",
  tags: ["Client"],
  request: { params: GetClientsSchema.shape.params },
  responses: createApiResponse(ClientSchema, "Success"),
});
clientRouter.get("/:id", validateGetRequest(GetClientsSchema), clientController.getClient);

clientRegistry.registerPath({
  method: "post",
  path: "/clients",
  tags: ["Client"],
  request: { params: PostClientSchema.shape.params },
  responses: createApiResponse(ClientSchema, "Success"),
});
clientRouter.post("/", validadePostRequest(ClientSchema), clientController.createClient);
