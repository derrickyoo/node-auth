import jwt from "jsonwebtoken";

const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

async function createTokens(userId, sessionToken) {
  try {
    // 1. 🪙 Create Access Token (Session ID and User ID)
    const accessToken = jwt.sign(
      {
        userId,
        sessionToken,
      },
      JWT_SIGNATURE
    );

    // 2. 🪙 Create Refresh Token (Session ID)
    const refreshToken = jwt.sign(
      {
        sessionToken,
      },
      JWT_SIGNATURE
    );

    // 3. ✅ Return tokens
    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(`JWT creation failed with ${err}`);
  }
}

export { createTokens };
