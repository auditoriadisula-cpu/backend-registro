const express = require("express");
const cors    = require("cors");

const app = express();

// CORS explícito — acepta cualquier origen (necesario para Android/Capacitor)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwv83r-QqzmZ8YhFsr5jYbEtkLb7BQEBevYioZ35TlC8R59Fk8jzaevaj_7pPOClwMHNw/exec";

/* =========================
   TEST
========================= */

app.get("/", (req, res) => {
  res.send("API funcionando");
});

/* =========================
   PROXY → AppScript
========================= */

app.post("/api", async (req, res) => {

  try {

    const response = await fetch(
      APPS_SCRIPT_URL,
      {
        method:   "POST",
        redirect: "follow",          // ← AppScript responde con 302, hay que seguirlo
        headers:  { "Content-Type": "application/json" },
        body:     JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    res.json(data);

  } catch(err) {

    res.json({
      ok:    false,
      error: err.message
    });

  }

});

/* =========================
   OPTIONS (preflight CORS)
========================= */

app.options("/api", cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto " + PORT);
});