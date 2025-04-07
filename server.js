require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require('./routes/api');
const authRoutes = require("./routes/authRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");  // Ajout de l'importation du modèle User
const app = express();
const path = require("path"); // Importer path pour gérer les chemins

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Définir EJS comme moteur de vue
app.set("view engine", "ejs");

// Définir le dossier des vues
app.set("views", path.join(__dirname, "views"));

// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));



// Définir EJS comme moteur de rendu
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Indiquer le bon dossier

// Servir les fichiers statiques (CSS, JS frontend)
app.use(express.static(path.join(__dirname, "public")));


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("💾 Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB", err));

// Route test
app.get("/", (req, res) => {
  res.send("🚢 API Port de Plaisance en ligne !");
});


// Routes
app.use('/api', apiRoutes);
app.use("/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/users", userRoutes);


// Création de l'admin s'il n'existe pas
async function checkAdmin() {
  const existingAdmin = await User.findOne({ email: "admin@mail.com" });
  if (!existingAdmin) {
    await User.create({ email: "admin@mail.com", password: "123456" });
    console.log("Admin créé.");
  } else {
    console.log("L'admin existe déjà.");
  }
}

// Appelle la fonction après la connexion à MongoDB
mongoose.connection.once("open", () => {
  checkAdmin();
});

// Lancement du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});




