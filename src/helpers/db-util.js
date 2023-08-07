import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectDatabase(collection) {
  const url = `mongodb+srv://moslemhosseinpour1998:moslemhosseinpour1998@cluster1.huk5vpv.mongodb.net/${collection}?retryWrites=true&w=majority`;

  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client;
}

export async function insertDocument(client, collectionName, document) {
  await client.connect();
  const db = client.db();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

export async function getAllDocuments(client, collectionName, sort) {
  await client.connect();
  const db = client.db();
  const collection = db.collection(collectionName);
  const documents = await collection.find().sort(sort).toArray();
  return documents;
}
