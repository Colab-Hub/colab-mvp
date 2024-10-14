import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { clientValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Client = z.infer<typeof ClientSchema>;

extendZodWithOpenApi(z);

export const ClientSchema = z.object(clientValidations);

export const GetClientsSchema = z.object({
  params: z.object({ id: clientValidations.id }),
});
