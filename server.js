const express = require("express");
const app = express();
const cors = require("cors");

const indexRoutes = require("./routes/routesApp");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/", indexRoutes);

app.listen(3000, console.log("¡Servidor encendido!"));

module.exports = app;
