const validate = (req, res, next) => {
  const { name, lastname, description, image, nationality, birthdate, teams } =
    req.body;

  if (!name) res.status(400).json({ error: "Name is required" });
  if (!lastname) res.status(400).json({ error: "Lastname is required" });
  if (!description) res.status(400).json({ error: "Description is required" });
  if (!image) res.status(400).json({ error: "Image is required" });
  if (!nationality) res.status(400).json({ error: "Nationality is required" });
  if (!birthdate) res.status(400).json({ error: "Birthdate is required" });
  if (!teams) res.status(400).json({ error: "Teams is required" });

  next();
};

module.exports = validate;
