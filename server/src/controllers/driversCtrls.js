require("dotenv").config();
const { DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require("../db");
const axios = require("axios");

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name.forename,
      lastname: elem.name.surname,
      description: elem.description,
      image: elem.image.url || DEFAULT_IMAGE,
      nationality: elem.nationality,
      birthdate: elem.dob,
      teams: elem.teams,
      code: elem.code,
      created: false,
    };
  });

const createDriver = async (
  name,
  lastname,
  description,
  image,
  nationality,
  birthdate,
  teams
) => {
  // Si no tengo imagen me lo crea con un imagen por default.
  if (!image) {
    image = DEFAULT_IMAGE;
  }

  const newDriver = await Driver.create({
    name,
    lastname,
    description,
    image,
    nationality,
    birthdate,
  });

  if (typeof teams === "string" && teams.length > 0) {
    const teamsNames = teams.split(",");

    for (const teamName of teamsNames) {
      let team = await Team.findOne({ where: { name: teamName } });
      if (!team) {
        // si no existe el team en la base de datos lo crea.
        team = await Team.create({ name: teamName });
      }
      //Asocio el team al driver.
      await newDriver.addTeam(team);
    }
    return newDriver;
  }
};

const getById = async (id, source) => {
  const driver =
    source === "api"
      ? (await axios.get(`http://localhost:5000/drivers/${id}`)).data
      : await Driver.findByPk(id, {
          include: {
            model: Team,
            as: "teams",
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
  if (source === "bdd") {
    return driver;
  } else {
    return {
      id: driver.id,
      name: driver.name.forename,
      lastname: driver.name.surname,
      description: driver.description,
      image: driver.image.url || DEFAULT_IMAGE,
      nationality: driver.nationality,
      birthdate: driver.birthdate,
      teams: driver.teams,
      create: false,
    };
  }
};

const getAll = async () => {
  // buscar en bdd
  const databaseDrivers = await Driver.findAll({
    include: {
      model: Team,
      as: "teams",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  // Agarro la propiedad teams de los drivers creados(vienen como un ARREGLO DE OBJETOS) y los transformo en un string.
  const dbDrivers = databaseDrivers.map((driver) => {
    const teams = driver.teams.map((team) => team.name).join(",");
    return { ...driver.toJSON(), teams };
  });

  // buscar en api y limpiar
  const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data;
  const apiDrivers = cleanArray(apiDriverRaw);

  return [...dbDrivers, ...apiDrivers];
};

const searchByName = async (name) => {
  const nameLower = name.toLowerCase();

  if (nameLower.length < 1) {
    throw new Error(`La consulta debe contener al menos una letra.`);
  }

  const dbDrivers = await Driver.findAll();
  const filteredDbDrivers = dbDrivers.filter((driver) =>
    driver.name.toLowerCase().includes(nameLower)
  );

  if (filteredDbDrivers.length > 0) {
    return filteredDbDrivers.slice(0, 15);
  }

  const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data;
  const apiDrivers = cleanArray(apiDriverRaw);
  const filteredApiDrivers = apiDrivers.filter((driver) =>
    driver.name.toLowerCase().includes(nameLower)
  );

  if (filteredApiDrivers.length === 0) {
    throw new Error(`No se encontraron resultados para: ${name}`);
  }

  return filteredApiDrivers.slice(0, 15);
};

module.exports = {
  createDriver,
  searchByName,
  getAll,
  getById,
};
