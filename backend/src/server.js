require('dotenv').config();
const express = require('express');
const cors = require('cors');

const prisma = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors()); // Autorise votre futur React à communiquer avec l'API
app.use(express.json()); // Permet à Express de lire le JSON envoyé dans les requêtes (req.body)

// Route de test pour vérifier que tout fonctionne
app.get('/api/health', async (req, res) => {
  try {
    // Petit test rapide pour vérifier la connexion à Neon
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "OK",
      message: "Le serveur Express et la base de données Neon sont connectés !"
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Le serveur fonctionne mais la base de données est inaccessible.",
      error: error.message
    });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur : http://localhost:${PORT}`);
});