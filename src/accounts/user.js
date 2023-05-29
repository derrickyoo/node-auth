import jwt from "jsonwebtoken";
import mongo from "mongodb";
import { createTokens } from "./tokens.js";

const { ObjectId } = mongo;

const JWTSignature = process.env.JWT_SIGNATURE;

async function getUserFromCookies(request, reply) {
  try {
    // Dynamic import (useful only when needed)
    const { user } = await import("../user/user.js");

    // 1. Check for Access Token
    if (request?.cookies?.accessToken) {
      // 2. Decode Access Token
      const { accessToken } = request.cookies;
      const decodedAccessToken = jwt.verify(accessToken, JWTSignature);

      console.log("🍪 decodedAccessToken: ", decodedAccessToken);

      return user.findOne({
        _id: new ObjectId(decodedAccessToken?.userId),
      });
    }

    const { session } = await import("../session/session.js");

    // 1. Check for Refres Token
    if (request?.cookies?.refreshToken) {
      // 2. Decode Refresh Token
      const { refreshToken } = request.cookies;
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature);

      // 3. Look up session
      const currentSession = await session.findOne({
        sessionToken,
      });

      // 4. Confirm session is valid
      if (currentSession.valid) {
        // 5. Look up current user
        const currentUser = await user.findOne({
          _id: new ObjectId(currentSession.userId),
        });

        // 6. Refresh tokens
        await refreshTokens(sessionToken, currentUser.userId, reply);

        // 7. Return current user
        return currentUser;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function refreshTokens(sessionToken, userId, reply) {
  try {
    console.log("TODO: refreshTokens");

    const { accessToken, refreshToken } = await createTokens(
      userId,
      sessionToken
    );

    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);

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
  } catch (err) {
    console.error(err);
  }
}

export { getUserFromCookies, refreshTokens };
