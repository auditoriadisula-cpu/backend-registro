const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz0Y9Y47MsqUFCg_YrC_8pgo-ED7WRxA7oC4aBK756j7wT7cbTS6TE3Rp0FovGwfaC4bA/exec";

/* =========================
TEST
========================= */

app.get("/", (req, res) => {

  res.send("API funcionando");

});

/* =========================
API
========================= */

app.post("/api", async (req, res) => {

  try {

    const response = await fetch(
      APPS_SCRIPT_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
          "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data =
    await response.json();

    res.json(data);

  } catch(err) {

    res.json({
      ok:false,
      error:err.message
    });

  }

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    "Servidor iniciado"
  );

});