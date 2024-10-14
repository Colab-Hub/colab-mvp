
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { clientValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Client = z.infer<typeof clientSchema>;

extendZodWithOpenApi(z);

export const clientSchema = z.object(clientValidations);