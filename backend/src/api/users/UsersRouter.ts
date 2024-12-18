﻿import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
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

usersRegistry.registerPath({
    method: "get",
    path: "/users/:id",
    tags: ["Users"],
    responses: createApiResponse(GetUserSchema, "Success"),
});
usersRouter.get("/:id", userController.getUserById);


usersRegistry.registerPath(  {
    method: "post",
    path: "/users",
    tags: ["Users"],
    responses: createApiResponse(PostUserSchema, "Success"),
});
usersRouter.post("/", userController.createUser);

usersRegistry.registerPath({
    method: "put",
    path: "/users/:id",
    tags: ["Users"],
    responses: createApiResponse(PostUserSchema, "Success"),
});
usersRouter.put("/:id", userController.updateUser);

usersRegistry.registerPath({
    method: "delete",
    path: "/users/:id",
    tags: ["Users"],
    responses: createApiResponse(PostUserSchema, "Success"),
});
usersRouter.delete("/:id", userController.deleteUser);
