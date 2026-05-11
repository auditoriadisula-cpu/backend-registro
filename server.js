const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.json());

/* TEST */

app.get("/", (req, res) => {

  res.json({
    ok: true,
    mensaje: "API NODE FUNCIONANDO"
  });

});

/* PRODUCTOS */

app.post("/obtenerProductos", async (req, res) => {

  try {

    res.json({
      ok: true,
      data: [
        ["1001", "JUGO NARANJA"],
        ["1002", "CREMA SULA"],
        ["1003", "QUESO"]
      ]
    });

  } catch (error) {

    res.json({
      ok: false,
      error: error.message
    });

  }

});

/* GUARDAR FURGON */

app.post("/guardarFurgon", async (req, res) => {

  try {

    console.log(req.body);

    res.json({
      ok: true,
      mensaje: "Furgón guardado"
    });

  } catch (error) {

    res.json({
      ok: false,
      error: error.message
    });

  }

});

/* GUARDAR PRODUCTO */

app.post("/guardarProducto", async (req, res) => {

  try {

    console.log(req.body);

    res.json({
      ok: true,
      mensaje: "Producto guardado"
    });

  } catch (error) {

    res.json({
      ok: false,
      error: error.message
    });

  }

});

/* REPORTES */

app.post("/obtenerReporte", async (req, res) => {

  try {

    res.json({
      ok: true,
      data: []
    });

  } catch (error) {

    res.json({
      ok: false,
      error: error.message
    });

  }

});

/* SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Servidor iniciado");

});