const { getAllTeams } = require("../controllers/teamsCtrls.js");

// Obtiene todos los equipos.
const getTeamsHandler = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTeamsHandler,
};
