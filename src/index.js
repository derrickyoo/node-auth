import "./env.js";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { run } from "./db.js";
import { signup } from "./accounts/signup.js";
import { authorize } from "./accounts/authorize.js";

// dotenv
console.log(process.env.APP_NAME);

// ESM specific to get access to the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

/**
 * Run the server!
 */
async function start() {
  try {
    // Add plugin
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    fastify.post("/api/signup", {}, async (req) => {
      try {
        const data = req.body;
        const userId = await signup(data);

        console.log(userId);
      } catch (err) {
        console.error(err);
      }
    });

    fastify.post("/api/signin", {}, async (req) => {
      try {
        const data = req.body;

        // TODO: authorize user
        await authorize(data);
      } catch (err) {
        console.error(err);
      }
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

run()
  .then(() => start())
  .catch(console.dir);
