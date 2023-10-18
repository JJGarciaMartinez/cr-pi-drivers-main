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
      created: false,
    };
  });

const createDriver = async ({
  name,
  lastname,
  description,
  image,
  nationality,
  birthdate,
  teams,
}) => {
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

  if (teams && teams.length > 0) {
    for (const teamName of teams) {
      let team = await Team.findOne({ where: { name: teamName } });
      if (!team) {
        team = await Team.create({ name: teamName });
      }
      await newDriver.addTeam(team);
    }
    return newDriver;
  }
};

const getById = async ({ id, source }) => {
  const driver =
    source === "api"
      ? (await axios.get(`http://localhost:5000/drivers/${id}`)).data
      : await Driver.findByPk(id, {
          include: {
            model: Team,
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
  const databaseDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data;
  const apiDrivers = cleanArray(apiDriverRaw);

  return [...databaseDrivers, ...apiDrivers];
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
