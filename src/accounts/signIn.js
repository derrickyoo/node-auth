import { createSession } from "./session.js";
import { createTokens } from "./tokens.js";

async function signIn(userId, request, reply) {
  const connection = {
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  };

  // 1. 🔮 Create session
  const { sessionToken } = await createSession(userId, connection);

  // 2. 🪙 Create JWT
  const { accessToken, refreshToken } = await createTokens(
    userId,
    sessionToken
  );

  const now = new Date();
  const refreshExpires = now.setDate(now.getDate + 30);

  // 3. 🍪 Set cookie
  reply
    .setCookie("accessToken", accessToken, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // secure: true // Requires HTTPS
    })
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      expires: refreshExpires,
      // secure: true // Requires HTTPS
    });
}

export { signIn };
