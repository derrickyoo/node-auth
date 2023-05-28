import { client } from "../db";

const user = client.db("dev").collection("user");

export { user };
