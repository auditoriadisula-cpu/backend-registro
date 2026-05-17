const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
DATOS PRUEBA
========================= */

const productos = [
  ["1001", "LECHE ENTERA"],
  ["1002", "JUGO NARANJA"],
  ["1003", "CREMA"],
  ["1004", "QUESO"],
  ["1005", "MANTEQUILLA"]
];

/* =========================
TEST
========================= */

app.get("/", (req, res) => {
  res.send("API funcionando");
});

/* =========================
API
========================= */

app.post("/api", (req, res) => {

  try {

    const data = req.body;

    console.log(data);

    if (data.accion === "obtenerProductos") {

      return res.json({
        ok: true,
        data: productos
      });

    }

    if (data.accion === "guardarFurgon") {

      return res.json({
        ok: true,
        mensaje: "Furgón guardado"
      });

    }

    if (data.accion === "guardarProducto") {

      return res.json({
        ok: true,
        mensaje: "Producto guardado"
      });

    }

    if (data.accion === "obtenerReporte") {

      return res.json({
        ok: true,
        data: []
      });

    }

    return res.json({
      ok: false,
      error: "Acción no válida"
    });

  } catch (err) {

    return res.json({
      ok: false,
      error: err.message
    });

  }

});

/* =========================
SERVIDOR
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
});