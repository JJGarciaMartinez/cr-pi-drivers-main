const {
  createDriver,
  getAllDrivers,
  searchDriverByName,
  getDriverById,
} = require("../controllers/driversCtrls.js");

// Obtiene todos los conductores o busca por nombre si se proporciona uno.
const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const drivers = name
      ? await searchDriverByName(name)
      : await getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtiene un conductor por su id y muestra los detalles.
const getDriverHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const driver = await getDriverById(id, source);
    res.status(200).json(driver);
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
    const newDriver = await createDriver({
      name,
      lastname,
      description,
      image,
      nationality,
      birthdate,
      teams,
    });
    res.status(201).json({ message: "Se creó exitosamente el conductor" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDriversHandler,
  getDriverHandler,
  createDriverHandler,
};
