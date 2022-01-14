const express = require("express");
const projectsModel = require("./projects-model");
const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projectsArr = await projectsModel.get();

    if (projectsArr.length === 0) {
      return [];
    } else {
      res.status(200).json(projectsArr);
    }
  } catch (err) {
    res.status(500);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const project = await projectsModel.get(req.params.id);

    if (project === null) {
      res.status(404).json({ message: "Project not found." });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(500);
  }
});

// POST /api/projects
router.post("/", async (req, res) => {
  try {
    const incomingProject = {
      name: req.body.name,
      description: req.body.description,
    };

    if (
      incomingProject.name === undefined ||
      incomingProject.name === "" ||
      incomingProject.description === undefined ||
      incomingProject.description === ""
    ) {
      res.status(400).json({ message: "Fields are incorrect or empty." });
    } else {
      const sendingProject = await projectsModel.insert(incomingProject);

      res.status(201).json(sendingProject);
    }
  } catch (err) {
    res.status(500);
  }
});

// PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const incomingProject = {
      name: req.body.name,
      description: req.body.description,
    };

    if (
      incomingProject.name === undefined ||
      incomingProject.name === "" ||
      incomingProject.description === undefined ||
      incomingProject.description === ""
    ) {
      res.status(400).json({ message: "Fields are incorrect or empty." });
    } else {
      const sendingProject = await projectsModel.update(id, incomingProject);

      if (sendingProject === null) {
        res.status(404).json({ message: "ID not found." });
      } else {
        res.json(sendingProject);
      }
    }
  } catch (err) {
    res.status(500);
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProject = await projectsModel.remove(id);

    if (deleteProject === 0) {
      res.status(404).json({ message: "ID not found." });
    } else if (deleteProject === 1) {
      res.json();
    }
  } catch (err) {
    res.status(500);
  }
});

// GET /api/projects/:id/actions
router.get("/:id/actions", async (req, res) => {
  try {
    const { id } = req.params;
    const projectActions = await projectsModel.getProjectActions(id);

    if (projectActions.length === 0) {
      res.status(404).json({ message: "ID not found." });
    } else {
      res.status(200).json(projectActions);
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
