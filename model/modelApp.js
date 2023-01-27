const pool = require("../config/bdInfo");
const bcrypt = require("bcryptjs");

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguaje } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [email, passwordEncriptada, rol, lenguaje];
  const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
};

const checkToken = async (email) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const { rows } = await pool.query(consulta, values);
  console.log(rows[0]);
  return rows[0];
};

const checkUser = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values);
  const { password: passwordEncriptada } = usuario;
  const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta." };
};

module.exports = { registrarUsuario, checkToken, checkUser };
