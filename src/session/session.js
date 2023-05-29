import { client } from "../db.js";

const session = client.db("dev").collection("session");

session.createIndex({ sessionToken: 1 });

export { session };
