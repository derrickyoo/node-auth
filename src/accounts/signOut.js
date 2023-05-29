import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

async function signOut(request, reply) {
  try {
    const { session } = await import("../session/session.js");

    // 1. 🪙 Get Refresh Token
    if (request?.cookies?.refreshToken) {
      // 2. 🍻 Decode Session Token from Refresh Token
      const { refreshToken } = request.cookies;
      const decodedRefreshToken = jwt.verify(refreshToken, JWTSignature);

      console.log("🍪 decodedRefreshToken: ", decodedRefreshToken);

      // 3. ✨ Delete current session in the database
      await session.deleteOne({
        sessionToken: decodedRefreshToken.sessionToken,
      });
    }

    // 4. 🍪 Remove cookies
    reply.clearCookie("refreshToken").clearCookie("accessToken");
  } catch (err) {
    console.error(err);
  }
}

export { signOut };
