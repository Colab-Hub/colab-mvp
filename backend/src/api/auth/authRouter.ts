import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validadePostRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { authController } from "./authController";
import { AuthSchema, PostAuthSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("Auth", PostAuthSchema);

authRegistry.registerPath({
  method: "post",
  path: "/auth/validate",
  tags: ["Auth"],
  request: { params: PostAuthSchema.shape.params },
  responses: createApiResponse(AuthSchema, "Success"),
});

authRouter.post("/validate", validadePostRequest(AuthSchema), authController.validateToken);
