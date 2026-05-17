const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATOS TEMPORALES
========================= */

let productos = [

  ["1001", "LECHE ENTERA"],
  ["1002", "JUGO NARANJA"],
  ["1003", "CREMA"],
  ["1004", "QUESO"],
  ["1005", "MANTEQUILLA"]

];

let registrosFurgon = [];
let registrosProductos = [];

/* =========================
   API
========================= */

app.get("/", (req, res) => {

  res.send("API ACTIVA");

});

/* =========================
   API POST
========================= */

app.post("/api", async (req, res) => {

  try {

    const data = req.body;

    /* =========================
       OBTENER PRODUCTOS
    ========================= */

    if (data.accion === "obtenerProductos") {

      return res.json({
        ok: true,
        data: productos
      });

    }

    /* =========================
       GUARDAR FURGON
    ========================= */

    if (data.accion === "guardarFurgon") {

      registrosFurgon.push({
        fecha: new Date(),
        ...data
      });

      return res.json({
        ok: true,
        mensaje: "Furgón guardado"
      });

    }

    /* =========================
       GUARDAR PRODUCTO
    ========================= */

    if (data.accion === "guardarProducto") {

      registrosProductos.push({
        fecha: new Date(),
        ...data
      });

      return res.json({
        ok: true,
        mensaje: "Producto guardado"
      });

    }

    /* =========================
       REPORTE
    ========================= */

    if (data.accion === "obtenerReporte") {

      const factura = String(data.factura).trim();

      const filtrados = registrosProductos.filter(r =>
        String(r.factura).trim() === factura
      );

      return res.json({
        ok: true,
        data: filtrados
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Servidor iniciado");

});
