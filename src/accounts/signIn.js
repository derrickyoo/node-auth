import { createSession } from "./session.js";

async function signIn(userId, request, reply) {
  const connection = {
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  };

  // 1. 🔮 Create session
  const sessionToken = await createSession(userId, connection);

  console.log("✅ sessionToken: ", sessionToken);

  // 2. 🪙 Create JWT

  // 3. 🍪 Set cookie
}

export { signIn };
