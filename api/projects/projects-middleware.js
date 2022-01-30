// add middlewares here related to projects
const checkRequestBody = (req, res, next) => {
  const { name, description, completed } = req.body;

  if (!name || !description || completed === undefined) {
    res.status(400).json({ message: "Fields are incorrect or empty." });
  } else {
    if (completed !== true) {
      req.body.completed = false;
    }

    next();
  }
};

module.exports = {
  checkRequestBody,
};
