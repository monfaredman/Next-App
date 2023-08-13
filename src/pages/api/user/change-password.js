import { getServerSession } from "next-auth/next";
import { hashPassword, verifyPassword } from "@/helpers/auth-util";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  connectDatabase,
  updateDocument,
  checkExistUser,
} from "@/helpers/db-util";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let client;

  try {
    client = await connectDatabase("users");
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    client.close();
    return;
  }

  const user = await checkExistUser(client, { email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await hashPassword(newPassword);
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed!" });
    client.close();
    return;
  }

  try {
    await updateDocument(
      client,
      "users",
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
  } catch (error) {
    res.status(500).json({ message: "Updating data failed!" });
    client.close();
    return;
  }

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
