import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Failed to create booking" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const query = {};
    if (userEmail) query.userEmail = userEmail;

    const list = await Booking.find(query).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete" });
  }
});

export default router;
