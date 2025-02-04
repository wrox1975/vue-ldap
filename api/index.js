import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/user", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
