import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { userController } from "@/api/users/UsersController";
import {
    GetUserSchema,
    PostUserSchema,
    UserSchema,
} from "@/api/users/Schema/UserSchema";
import {PostOpportunitiesSchema} from "@/api/opportunities/Schema/OpportunitiesSchema";


export const usersRegistry = new OpenAPIRegistry();
export const usersRouter: Router = express.Router();

usersRegistry.register("Users", UserSchema);

usersRegistry.registerPath({
    method: "get",
    path: "/users",
    tags: ["Users"],
    responses: createApiResponse(z.array(GetUserSchema), "Success"),
});                                                
usersRouter.get("/", userController.getUsers);
// usersRouter.get("/:id", userController.getOpportunity);
//
// usersRegistry.registerPath(  {
//     method: "post",
//     path: "/users",
//     tags: ["Users"],
//     responses: createApiResponse(PostUserSchema, "Success"),
// });
// usersRouter.post("/", opportunitiesController.createOpportunity);
