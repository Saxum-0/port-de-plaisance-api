const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

// 🔹 GET /catways - Lister tous les catways
router.get("/", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET /catways/:id - Détails d’un catway
router.get("/:id", async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 POST /catways - Créer un catway
router.post("/", async (req, res) => {
  const { catwayNumber, type, catwayState } = req.body;
  try {
    const newCatway = new Catway({ catwayNumber, type, catwayState });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 PUT /catways/:id - Modifier un catway
router.put("/:id", async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCatway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updatedCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 DELETE /catways/:id - Supprimer un catway
router.delete("/:id", async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json({ message: "Catway supprimé !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /catways/:id (Récupérer un catway spécifique)
router.get("/catways/:id", async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ msg: "Catway non trouvé" });
    }
    res.json(catway);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// DELETE /catways/:id (Supprimer un catway)
router.delete("/catways/:id", async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) {
      return res.status(404).json({ msg: "Catway non trouvé" });
    }
    res.json({ msg: "Catway supprimé" });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
