const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

res.send("API funcionando");

});

app.post("/api", async (req, res) => {

try {

```
const data = req.body;

console.log(data);

res.json({
  ok: true,
  recibido: data
});
```

} catch (err) {

```
res.status(500).json({
  ok: false,
  error: err.message
});
```

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("Servidor iniciado");

});
