const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

require('dotenv').config(); 
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 

// Route register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").isLength({ min: 6 }).withMessage("Mot de passe trop court"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "L'utilisateur existe déjà" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Avant d'enregistrer dans la BD
      console.log("Mot de passe avant hachage:", password);
      console.log("Mot de passe haché:", hashedPassword);

      user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ msg: "Utilisateur créé avec succès" });
    } catch (err) {
      console.error("❌ ERREUR :", err.message, err.stack); 
      if (err.code === 11000) {
        return res.status(400).json({ msg: "L'email est déjà utilisé" });
      }
      res.status(500).json({ msg: "Erreur serveur" });
    }
  }
);

// Route login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").exists().withMessage("Mot de passe requis"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Email incorrect" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "mot de passe incorrect" });

      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ msg: "Erreur serveur" });
    }
  }
);

// Route me

router.get("/me", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Accès refusé" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expiré" });
    }
    res.status(401).json({ msg: "Token invalide" });
  }
});

module.exports = router;
