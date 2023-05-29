import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

async function getUserFromCookies(request) {
  try {
    // Check Access Token
    if (request?.cookies?.accessToken) {
      // If Access Token
      const { accessToken } = request.cookies;

      // Decode Access Token
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
  } catch (err) {
    console.error(err);
  }
}

export { getUserFromCookies, refreshTokens };
