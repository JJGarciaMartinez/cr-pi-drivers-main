const axios = require("axios");
const { Team, sequelize } = require("../db");

const getAllTeams = async () => {
  try {
    const response = await axios.get("http://localhost:5000/drivers");
    const drivers = response.data;

    const teamsAll = new Set();

    for (const driver of drivers) {
      if (driver.teams) {
        const teams = driver.teams.split(/\s*,\s*/);
        teams.forEach((team) => teamsAll.add(team.trim()));
      }
    }

    const transaction = await sequelize.transaction();

    try {
      const createdTeams = await Promise.all(
        Array.from(teamsAll).map((teamName) =>
          Team.findOrCreate({
            where: { name: teamName },
            transaction,
          })
        )
      );

      await transaction.commit();

      return createdTeams.map(([team]) => team);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw new Error("Error al obtener los equipos de la API");
  }
};

module.exports = {
  getAllTeams,
};
