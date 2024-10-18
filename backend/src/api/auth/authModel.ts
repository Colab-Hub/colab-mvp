import { authValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Auth = z.infer<typeof AuthSchema>;

extendZodWithOpenApi(z);

export const AuthSchema = z.object(authValidations);

export const PostAuthSchema = z.object({
  params: AuthSchema,
});
