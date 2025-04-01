const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayNumber: Number,
  clientName: String,
  boatName: String,
  checkIn: Date,
  checkOut: Date
}, { timestamps: true });

module.exports = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
