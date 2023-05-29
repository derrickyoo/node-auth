import { client } from "../db.js";

const user = client.db("dev").collection("user");

user.createIndex({ "email.address": 1 });

export { user };
