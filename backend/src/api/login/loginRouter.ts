import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { LoginSchema, PostLoginSchema } from "./loginModel";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validadePostRequest } from "@/common/utils/httpHandlers";
import { loginController } from "./loginController";
import { ClientSchema, PostClientSchema } from "../client/clientModel";

export const loginRegistry = new OpenAPIRegistry();
export const loginRouter: Router = express.Router();

loginRegistry.register("Login", PostClientSchema);

loginRegistry.registerPath({
  method: "post",
  path: "/login/signin",
  tags: ["Sign In"],
  request: { params: PostLoginSchema.shape.params },
  responses: createApiResponse(LoginSchema, "Success"),
});
loginRouter.post("/signin", validadePostRequest(LoginSchema), loginController.login);

loginRegistry.registerPath({
  method: "post", 
  path: "/login/signup",
  tags: ["Sign Up"],
  request: { params: PostClientSchema.shape.params },
  responses: createApiResponse(ClientSchema, "Success"),
});loginRouter.post("/signup", validadePostRequest(LoginSchema), loginController.signup);
