import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database
  const db = new Database("quotes.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      siteType TEXT NOT NULL,
      description TEXT,
      pages INTEGER,
      budget INTEGER,
      deadline TEXT,
      details TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API Routes
  app.post("/api/quotes", (req, res) => {
    const { name, email, siteType, description, pages, budget, deadline, details } = req.body;
    
    try {
      const stmt = db.prepare(`
        INSERT INTO quotes (name, email, siteType, description, pages, budget, deadline, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, siteType, description, pages, budget, deadline, details);
      res.status(201).json({ success: true, message: "Demande enregistrée avec succès" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement" });
    }
  });

  app.get("/api/quotes", (req, res) => {
    try {
      const quotes = db.prepare("SELECT * FROM quotes ORDER BY created_at DESC").all();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erreur lors de la récupération" });
    }
  });

  app.patch("/api/quotes/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const stmt = db.prepare("UPDATE quotes SET status = ? WHERE id = ?");
      stmt.run(status, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erreur lors de la mise à jour" });
    }
  });

  app.get("/api/quotes/status/:email", (req, res) => {
    const { email } = req.params;
    try {
      const quote = db.prepare("SELECT status FROM quotes WHERE email = ? ORDER BY created_at DESC LIMIT 1").get();
      res.json(quote || null);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erreur lors de la vérification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
