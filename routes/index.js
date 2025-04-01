const express = require("express");
const router = express.Router();
const Catway = require("../models/catway");
const Reservation = require("../models/reservation");
const User = require("../models/user");

router.use(express.urlencoded({ extended: true }));

// Page d'accueil
router.get("/", (req, res) => {
  res.render("index");
});

// Tableau de bord utilisateur
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Documentation de l'API
router.get("/documentation", (req, res) => {
  res.render("documentation");
});

// Liste des catways
router.get("/catways", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways", { catways });
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des catways");
  }
});

// Détail d'un catway par ID
router.get("/catways/:id", async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    res.render("catway", { catway });
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération du catway");
  }
});

// Détail d'un catway par numéro (catwayNumber)
router.get("/catway", async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: Number(req.query.catwayNumber) });
    if (!catway) return res.status(404).send("Catway non trouvé");
    res.render("catway", { catway });
  } catch (err) {
    res.status(500).send("Erreur lors de la recherche du catway");
  }
});

// Liste des réservations
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("reservations", { reservations });
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des réservations");
  }
});

// Détail d'une réservation par ID
router.get("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.render("reservation", { reservation });
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération de la réservation");
  }
});

// Détail d'une réservation 

router.get("/reservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.query.id);
    if (!reservation) return res.status(404).send("Réservation non trouvée");

    const catway = await Catway.findOne({ catwayNumber: reservation.catwayNumber });

    res.render("reservation", { reservation, catway });
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération de la réservation");
  }
});


// ===== Utilisateurs =====
router.post("/users/create", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
});

router.post("/users/update", async (req, res) => {
  try {
    const { id, email } = req.body;
    await User.findByIdAndUpdate(id, { email });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Erreur lors de la modification de l'utilisateur");
  }
});

router.post("/users/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression de l'utilisateur");
  }
});

// ===== Catways =====
router.post("/catways/create", async (req, res) => {
  try {
    const { catwayNumber, type, catwayState } = req.body;
    await Catway.create({ catwayNumber, type, catwayState });
    res.redirect("/catways");
  } catch (err) {
    res.status(500).send("Erreur lors de la création du catway");
  }
});

router.post("/catways/update", async (req, res) => {
  try {
    const { id, catwayState } = req.body;
    await Catway.findByIdAndUpdate(id, { catwayState });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Erreur lors de la mise à jour du catway");
  }
});

router.post("/catways/delete", async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.body.id);
    res.redirect("/catways");
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression du catway");
  }
});

// ===== Réservations =====
router.post("/reservations/create", async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;
    await Reservation.create({ catwayNumber, clientName, boatName, checkIn, checkOut });
    res.redirect("/reservations");
  } catch (err) {
    res.status(500).send("Erreur lors de la création de la réservation");
  }
});

router.post("/reservations/delete", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.body.id);
    res.redirect("/reservations");
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression de la réservation");
  }
});

module.exports = router;
