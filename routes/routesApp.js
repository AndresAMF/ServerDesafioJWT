const { Router } = require("express");
const router = Router();

const {
  nuevoUsuario,
  mostrarUsuarios,
  login,
} = require("../controllers/controllerApp");

router.post("/usuarios", nuevoUsuario);
router.get("/usuarios", mostrarUsuarios);
router.post("/login", login);
module.exports = router;
