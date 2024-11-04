import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { authRegistry } from "@/api/auth/authRouter";
import { clientRegistry } from "@/api/client/clientRouter";
import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { loginRegistry } from "@/api/login/loginRouter";
import {opportunitiesRegistry} from "@/api/opportunities/OpportunitiesRouter";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    clientRegistry,
    loginRegistry,
    authRegistry,
    opportunitiesRegistry
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
