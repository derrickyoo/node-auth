import { client } from "../db.js";

const user = client.db("dev").collection("user");

export { user };
