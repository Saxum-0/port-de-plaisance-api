const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

// Afficher les catways
router.get("/catways", async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render("catways", { catways });
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

// Ajouter un catway
router.post("/api/catways", async (req, res) => {
    try {
        const newCatway = new Catway({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState
        });

        await newCatway.save();
        res.redirect("/catways");
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
