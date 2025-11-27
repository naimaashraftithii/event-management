import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookingsRouter from "./routes/bookings.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/bookings", bookingsRouter);
app.use("/api/products", productsRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected");
  app.listen(5000, () => console.log("Server running on 5000"));
});
