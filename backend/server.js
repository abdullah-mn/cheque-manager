import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(express.json()); // parse JSON request bodies

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
