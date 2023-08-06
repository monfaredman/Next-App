import { MongoClient } from "mongodb";

export default function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    const url =
      "mongodb+srv://moslemhosseinpour1998:moslemhosseinpour1998@cluster1.huk5vpv.mongodb.net/?retryWrites=true&w=majority";
    const client = MongoClient.connect("url").then((client) => {
      const db = client.db();
      return db.collection("emails").insertOne({ email: userEmail });
    });
    res.status(201).json({ message: "Signed up" });
  }
}
