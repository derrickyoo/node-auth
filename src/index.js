import "./env.js";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { client, run } from "./db.js";

// dotenv
console.log(process.env.APP_NAME);

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

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
