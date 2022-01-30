const express = require("express");

const actionsModel = require("./actions-model");
const router = express.Router();

// GET /api/actions
router.get("/", async (req, res) => {
  try {
    const actionsArr = await actionsModel.get();

    res.status(200).json(actionsArr);
  } catch (err) {
    res.status(500);
  }
});

// GET /api/actions/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actionObj = await actionsModel.get(id);

    if (actionObj === null) {
      res.status(404).json({ message: "ID not found." });
    } else {
      res.status(200).json(actionObj);
    }
  } catch (err) {
    res.status(500);
  }
});

// POST /api/actions
router.post("/", async (req, res) => {
  try {
    const { project_id, description, notes } = req.body;

    if (!project_id || !description || !notes) {
      res.status(400).json({ message: "Fields are empty or incorrect." });
    } else {
      const insertAction = await actionsModel.insert(req.body);
      res.status(201).json(insertAction);
    }
  } catch (err) {
    res.status(500);
  }
});

// PUT /api/actions/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;

    if (!project_id || !description || !notes || !completed) {
      res.status(400).json({ message: "Fields are empty or incorrect." });
    } else {
      const updateAction = await actionsModel.update(id, req.body);

      if (updateAction === null) {
        res.status(404).json({ message: "ID not found." });
      } else {
        res.status(200).json(updateAction);
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Data couldn't be changed." });
  }
});

// DELETE /api/actions/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAction = await actionsModel.remove(id);

    if (deleteAction === 0) {
      res.status(404).json({ message: "ID not found." });
    } else if (deleteAction === 1) {
      res.status(200).json();
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
