const { Router } = require("express");
const { getTeamsHandler } = require("../handlers/teamsHandlers");

const teamRouter = Router();

//* GET /teams
teamRouter.get("/", getTeamsHandler);

module.exports = teamRouter;
