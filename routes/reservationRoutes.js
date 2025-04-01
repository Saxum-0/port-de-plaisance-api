const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// 🔹 GET /reservations - Liste de toutes les réservations (API REST)
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});





// 🔹 GET /catways/:id/reservations - Lister toutes les réservations d’un catway
router.get("/:id/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET /catways/:id/reservations/:idReservation - Détails d’une réservation
router.get("/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 POST /catways/:id/reservations - Prendre une réservation
router.post("/:id/reservations", async (req, res) => {
  const { clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const newReservation = new Reservation({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      checkIn,
      checkOut
    });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 DELETE /catways/:id/reservations/:idReservation - Supprimer une réservation
router.delete("/:id/reservations/:idReservation", async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!deletedReservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json({ message: "Réservation supprimée !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /catways/:id/reservations/:idReservation (Détails d'une réservation spécifique)
router.get("/catways/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ msg: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// DELETE /catways/:id/reservations/:idReservation (Supprimer une réservation)
router.delete("/catways/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ msg: "Réservation non trouvée" });
    }
    res.json({ msg: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
