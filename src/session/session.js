import { client } from "../db.js";

const session = client.db("dev").collection("session");

export { session };
