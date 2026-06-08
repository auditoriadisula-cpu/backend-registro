const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwv83r-QqzmZ8YhFsr5jYbEtkLb7BQEBevYioZ35TlC8R59Fk8jzaevaj_7pPOClwMHNw/exec";

/* =========================
TEST
========================= */
app.get("/", (req, res) => {
  res.send("API funcionando");
});

/* =========================
API PRINCIPAL
========================= */
app.post("/api", async (req, res) => {
  try {

    // 🔥 ENVIAR A APPS SCRIPT
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    // 🔥 LEER COMO TEXTO (EVITA CRASH EN ANDROID)
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        ok: false,
        error: "Apps Script no devolvió JSON válido",
        raw: text
      });
    }

    // 🔥 RESPUESTA FINAL LIMPIA
    return res.json(data);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

/* =========================
START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto " + PORT);
});