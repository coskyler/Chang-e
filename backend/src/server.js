import express from "express";
import stockRoutes from "./routes/stock.js";
import userRoutes from "./routes/user.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://changefinance.coskyler.com",
  ],
  credentials: true,
}));

// Clerk authentication middleware
app.use(clerkMiddleware());

// Protect all routes below
app.use(requireAuth());
app.use(express.json());

// Routes (all protected)
app.use("/stock", stockRoutes);
app.use("/user", userRoutes);

app.listen(80, () => console.log("Server running"));
