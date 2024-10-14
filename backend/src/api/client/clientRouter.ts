import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { clientSchema } from "./clientModel";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { clientControler } from "./clientController";

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRegistry.register("Client", clientSchema);

clientRegistry.registerPath({
  method: "get",
  path: "/clients",
  tags: ["Client"],
  responses: createApiResponse(z.array(clientSchema), "Success"),
});

clientRouter.get("/", clientControler.getClients)
