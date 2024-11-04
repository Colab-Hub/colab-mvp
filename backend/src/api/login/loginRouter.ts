import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validadePostRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { ClientSchema, PostClientSchema } from "../client/clientModel";
import { loginController } from "./loginController";
import { LoginSchema, PostLoginSchema } from "./loginModel";

export const loginRegistry = new OpenAPIRegistry();
export const loginRouter: Router = express.Router();

loginRegistry.register("Login", PostClientSchema);

loginRegistry.registerPath({
  method: "post",
  path: "/login/signin",
  tags: ["Login"],
  request: { params: PostLoginSchema.shape.params },
  responses: createApiResponse(LoginSchema, "Success"),
});
loginRouter.post("/signin", validadePostRequest(LoginSchema), loginController.login);

loginRegistry.registerPath({
  method: "post",
  path: "/login/signup",
  tags: ["Login"],
  request: { params: PostClientSchema.shape.params },
  responses: createApiResponse(ClientSchema, "Success"),
});
loginRouter.post("/signup", validadePostRequest(LoginSchema), loginController.signup);
