// Load environment variables from .env into process.env
import "dotenv/config";
import dns from "dns";

// Fix MongoDB Atlas SRV connection lookup issues on local network only
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

// Connect to MongoDB
connectToDB();

const PORT = process.env.PORT || 3002;

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
