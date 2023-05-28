import bcrypt from "bcryptjs";

const { genSalt, hash } = bcrypt;

async function signup(user) {
  // 1. 🥩 Plain text password
  const { password } = user;

  // 2. 🧂 Generate salt
  const salt = await genSalt(10);

  // 3. 🔥 Hash with salt
  const hashedPassword = await hash(password, salt);

  console.log("🥩🧂🔥", hashedPassword);

  // 4. ✨ Store in database

  // return the user from the database
}

export { signup };
