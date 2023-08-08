import {
  connectDatabase,
  insertDocument,
  checkExistUser,
} from "@/helpers/db-util";
import { hashPassword } from "@/helpers/auth-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    let client;

    try {
      client = await connectDatabase("users");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      client.close();
      return;
    }

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }

    const existingUser = await checkExistUser(client, { email });
    if (existingUser) {
      res.status(500).json({ message: "User exists already!" });
      client.close();
      return;
    }

    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      client.close();
      return;
    }

    try {
      await insertDocument(client, "users", {
        email,
        password: hashedPassword,
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      client.close();
      return;
    }

    res.status(201).json({ message: "Signed up" });
    client.close();
  }
}
