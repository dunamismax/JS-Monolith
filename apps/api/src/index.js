import cors from "@fastify/cors";
import Fastify from "fastify";
import { postsRoutes } from "./routes/posts.js";
import { toolsRoutes } from "./routes/tools.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: true,
});

await fastify.register(postsRoutes, { prefix: "/api" });
await fastify.register(toolsRoutes, { prefix: "/api" });

fastify.get("/", async (_request, _reply) => {
  return {
    message: "js-monolith API",
    version: "1.0.0",
    endpoints: [
      "GET /api/posts",
      "GET /api/posts/:id",
      "POST /api/tools/analyze-text",
      "GET /api/tools/random-number",
      "POST /api/tools/roll-dice",
      "POST /api/tools/generate-password",
      "POST /api/tools/color-palette",
      "POST /api/tools/qr-code",
      "POST /api/tools/hash-text",
    ],
  };
});

const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`API server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
