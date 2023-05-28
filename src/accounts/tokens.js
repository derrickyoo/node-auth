import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

async function createTokens() {
  try {
    // 1. 🪙 Create Refresh Token (Session ID)
    // 2. 🪙 Create Access Token (Session ID and User ID)
    // 3. ✅ Return Refresh Token and Access Token
  } catch (err) {
    throw new Error(`JWT faiels with ${err}`);
  }
}

export { createTokens };
