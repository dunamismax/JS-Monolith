import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'js-monolith';

export const getClient = async () => {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client;
};

export const getDb = async () => {
  if (!db) {
    const mongoClient = await getClient();
    db = mongoClient.db(DB_NAME);
  }
  return db;
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);
