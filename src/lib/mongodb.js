import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// API routes use THIS
export async function getDb() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || 'app';
  return client.db(dbName);
}

