const express = require("express");
const { checkRequestBody } = require("./projects-middleware");

const projectsModel = require("./projects-model");
const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projectsArr = await projectsModel.get();

    if (projectsArr.length === 0) {
      res.status(200).json([]);
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
router.post("/", checkRequestBody, async (req, res) => {
  try {
    const sendingProject = await projectsModel.insert(req.body);

    return res.status(201).json(sendingProject);
  } catch (err) {
    res.status(500);
  }
});

// PUT /api/projects/:id
router.put("/:id", checkRequestBody, async (req, res) => {
  try {
    const { id } = req.params;
    const sendingProject = await projectsModel.update(id, req.body);

    if (sendingProject === null) {
      res.status(404).json({ message: "ID not found." });
    } else {
      res.status(200).json(sendingProject);
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
      res.status(200).json({ message: "Project deleted." });
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
      res.status(404).json([]);
    } else {
      res.status(200).json(projectActions);
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
