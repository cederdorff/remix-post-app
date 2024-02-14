const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  const errorMessage =
    NODE_ENV === "production"
      ? "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
      : "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}
