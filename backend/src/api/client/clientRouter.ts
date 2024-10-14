import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { ClientSchema, GetClientsSchema } from "./clientModel";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userRouter } from "../user/userRouter";
import { clientController } from "./clientController";

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRegistry.register("Client", ClientSchema);

clientRegistry.registerPath({
  method: "get",
  path: "/clients",
  tags: ["Client"],
  responses: createApiResponse(z.array(ClientSchema), "Success"),
});

clientRouter.get("/", clientController.getClients);

clientRegistry.registerPath({
  method: "get",
  path: "/clients/{id}",
  tags: ["Client"],
  request: { params: GetClientsSchema.shape.params },
  responses: createApiResponse(ClientSchema, "Success"),
});

clientRouter.get("/:id", validateRequest(GetClientsSchema), clientController.getClient);
