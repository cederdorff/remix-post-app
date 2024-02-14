import { MongoClient } from "mongodb";
const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  const errorMessage =
    NODE_ENV === "production"
      ? "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
      : "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getDatabase() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// Automatically close the database connection when the Node.js process exits
process.on("exit", async () => {
  await client.close();
});

// Handle CTRL+C events
process.on("SIGINT", async () => {
  await client.close();
  process.exit();
});

const db = await getDatabase(); // Connect to the MongoDB database

export default db;
