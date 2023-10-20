const { Router } = require("express");
const {
  getDriversHandler,
  getIdHandler,
  createDriverHandler,
} = require("../handlers/driversHandlers.js");
const validate = require("../utils/validator");

const driverRouter = Router();

//* GET /drivers
driverRouter.get("/", getDriversHandler);

//* GET /drivers/:id
driverRouter.get("/:id", getIdHandler);

//* POST /drivers
driverRouter.post("/", validate, createDriverHandler);

module.exports = driverRouter;
