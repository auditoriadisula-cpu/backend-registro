const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
CONFIG
========================= */

app.use(cors());

app.use(express.json());

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

const data = req.body;

try {

```
console.log("Datos recibidos:", data);

res.json({
  ok: true,
  data: "Backend funcionando"
});
```

} catch (error) {

```
res.json({
  ok: false,
  error: error.message
});
```

}

});

/* =========================
START SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("Servidor iniciado en puerto " + PORT);

});
