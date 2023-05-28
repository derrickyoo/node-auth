import bcrypt from "bcryptjs";

const { genSalt, hash } = bcrypt;

async function signup(data) {
  // Dynamic import (useful only when needed)
  const { user } = await import("../user/user.js");

  // 1. 🥩 Plain text password
  const { password, email } = data;

  // 2. 🧂 Generate salt
  const salt = await genSalt(10);

  // 3. 🔥 Hash with salt
  const hashedPassword = await hash(password, salt);

  console.log("🥩🧂🔥", hashedPassword);

  // 4. ✨ Store in database
  const result = await user.insertOne({
    ...user,
    email: {
      address: email,
      verified: false,
    },
    password: hashedPassword,
  });

  return result.insertedId;
}

export { signup };
