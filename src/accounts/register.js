import bcrypt from "bcryptjs";

const { genSalt, hash } = bcrypt;

async function register(data) {
  try {
    // Dynamic import (useful only when needed)
    const { user } = await import("../user/user.js");

    // 1. 🥩 Plain text password
    const { password, email } = data;

    // 2. 🧂 Generate salt
    const salt = await genSalt(10);

    // 3. 🔥 Hash with salt
    const hashedPassword = await hash(password, salt);

    // 4. ✨ Store in database
    const result = await user.insertOne({
      ...data,
      email: {
        address: email,
        verified: false,
      },
      password: hashedPassword,
    });

    // 5. ✅ Return new user ID
    return result.insertedId;
  } catch (err) {
    throw new Error(`User registration failed with ${err}`);
  }
}

export { register };
