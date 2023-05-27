import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

// ESM specific to get access to the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify();

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.get("/", {}, (req, reply) => {
      reply.send({
        data: "hello world",
      });
    });
    await app.listen({
      port: 3000,
    });
    console.log("Server listening at port: 3000");
  } catch (err) {
    console.error(err);
  }
}

startApp();
