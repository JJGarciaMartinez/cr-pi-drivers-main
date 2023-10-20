const {
  createDriver,
  searchByName,
  getAll,
  getById,
} = require("../controllers/driversCtrls.js");

// Obtiene todos los conductores o busca por nombre si se proporciona uno.
const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const drivers = name ? await searchByName(name) : await getAll();
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Obtiene un conductor por su id y muestra los detalles.
const getIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const driverDetail = await getById(id, source);
    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crea un nuevo conductor.
const createDriverHandler = async (req, res) => {
  try {
    const {
      name,
      lastname,
      description,
      image,
      nationality,
      birthdate,
      teams,
    } = req.body;
    const newDriver = await createDriver(
      name,
      lastname,
      description,
      image,
      nationality,
      birthdate,
      teams
    );
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDriversHandler,
  getIdHandler,
  createDriverHandler,
};
