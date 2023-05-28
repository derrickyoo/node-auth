import "./env.js";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import path from "path";
import { fileURLToPath } from "url";
import { authorize } from "./accounts/authorize.js";
import { register } from "./accounts/register.js";
import { signIn } from "./accounts/signIn.js";
import { run } from "./db.js";

// Test dotenv
console.log("🍎 App: ", process.env.APP_NAME);

// ESM specific to get access to the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({
  logger: true,
});

/**
 * Run the server!
 */
async function start() {
  try {
    // Add plugin
    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE,
    });

    // Add plugin
    app.register(fastifyStatic, {
      root: path.join(__dirname, "../public"),
    });

    app.post("/api/signup", {}, async (request) => {
      try {
        const data = request.body;
        const userId = await register(data);

        console.log(userId);
      } catch (err) {
        app.log.error(err);
      }
    });

    app.post("/api/signin", {}, async (request, reply) => {
      try {
        const data = request.body;
        const { isAuthorized, userId } = await authorize(data);

        console.log("🔓 isAuthorized: ", isAuthorized);

        if (isAuthorized) {
          await signIn(userId, request, reply);
        }

        // 1. 🪙 Generate auth tokens

        // 2. 🍪 Set HttpOnly cookies
        reply.setCookie("testCookie", "test value", {
          path: "/",
          domain: "localhost",
          httpOnly: true,
          // secure: true // Requires HTTPS
        });

        // 3. ✅ Send back in the response (or reply)
        reply.send({
          data: "test response",
        });
      } catch (err) {
        app.log.error(err);
      }
    });

    app.get("/test", (request, reply) => {
      console.log("🍪 cookie: ", request.cookies.testCookie);

      reply.send({
        data: "test route",
      });
    });

    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

run()
  .then(() => start())
  .catch(console.dir);
