import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

// ESM specific to get access to the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

// Add plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

fastify.get("/", async (req, reply) => {
  reply.type("application/json").code(200);

  return { data: "hello, world" };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
