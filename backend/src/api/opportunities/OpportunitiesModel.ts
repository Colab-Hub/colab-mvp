import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { opportunitiesValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Opportunities = z.infer<typeof OpportunitiesSchema>;

extendZodWithOpenApi(z);

export const OpportunitiesSchema = z.object(opportunitiesValidations);

export const GetOpportunitiesSchema = z.object({
    params: z.object({ id: opportunitiesValidations.id }),
});

export const PostOpportunitiesSchema = z.object({
    params: OpportunitiesSchema,
});
