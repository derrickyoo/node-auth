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
import { getUserFromCookies } from "./accounts/user.js";

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
          reply.send({
            data: "User is signed in",
          });
        }

        reply.send({
          data: "User authorization failed",
        });
      } catch (err) {
        app.log.error(err);
      }
    });

    app.get("/test", {}, async (request, reply) => {
      try {
        const user = await getUserFromCookies(request);
        console.log(user);

        if (user?._id) {
          reply.send({
            data: user,
          });
        } else {
          reply.send({
            data: "User not found",
          });
        }
      } catch (err) {
        app.log.error(err);
      }
      // 1. Verify user login
      // 2. Return user email, if exists, otherwise unauthorized

      reply.send({
        data: "Test route",
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
