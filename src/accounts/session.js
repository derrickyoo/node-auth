import { randomBytes } from "crypto";

async function createSession(userId, connection) {
  try {
    // Dynamic import (useful only when needed)
    const { session } = await import("../session/session.js");

    // 1. 🪙 Generate a session token
    const sessionToken = randomBytes(43).toString("hex");

    // 2. 💻 Retrieve connection information from Fastify (User-Agent, IP, etc.)
    const { ip, userAgent } = connection;

    // 3. ✨ Store session in database
    await session.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    // 4. ✅ Return session token
    return sessionToken;
  } catch (err) {
    throw new Error(`Session creation failed with ${err}`);
  }
}

export { createSession };
