import { loginValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Login = z.infer<typeof LoginSchema>;

extendZodWithOpenApi(z);

export const LoginSchema = z.object(loginValidations);

export const PostLoginSchema = z.object({
  params: LoginSchema,
});
