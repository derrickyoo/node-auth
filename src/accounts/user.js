import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

async function getUserFromCookies(request) {
  try {
    // Dynamic import (useful only when needed)
    const { user } = await import("../user/user.js");

    // 1. Check for Access Token
    if (request?.cookies?.accessToken) {
      // 2. Decode Access Token
      const { accessToken } = request.cookies;
      const decodedAccessToken = jwt.verify(accessToken, JWTSignature);

      console.log("🍪 decodedAccessToken: ", decodedAccessToken);
    }

    // return user from record
    // decode refresh token
    // look up session
    // confirm session is valid
    // if session is valid
    // look up current user
    // refresh tokens
    // return current user
  } catch (err) {
    console.error(err);
  }
}

async function refreshTokens() {
  try {
    console.log("TODO: refreshTokens");
  } catch (err) {
    console.error(err);
  }
}

export { getUserFromCookies, refreshTokens };
