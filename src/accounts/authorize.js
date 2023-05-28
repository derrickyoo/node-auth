import bcrypt from "bcryptjs";

const { compare } = bcrypt;

async function authorize(data) {
  try {
    // Dynamic import (useful only when needed)
    const { user } = await import("../user/user.js");

    // 1. 🥩 Plain text password
    const { email, password } = data;

    // 2. 🕵️ Look up user in the database
    const currentUser = await user.findOne({
      "email.address": email,
    });

    // 3. 🍻 Compare using bcrypt
    const currentPassword = currentUser.password;
    const isAuthorized = await compare(password, currentPassword);

    // 4. ✅ Return boolean
    return isAuthorized;
  } catch (err) {
    throw new Error(`User authorization failed with ${err}`);
  }
}

export { authorize };
