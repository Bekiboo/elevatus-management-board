var express = require("express");
var router = express.Router();

const Child = require("../models/child");

// router.get("/", async (req, res, next) => {
//   try {
//     const children = Child.find().populate("group").exec();
//     res.status(200).json({
//       message: "Children fetched successfully!",
//       children: children,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred",
//       error: error,
//     });
//   }
// });

router.get('/', (req, res, next) => {
  Child.find()
  .populate('group')
  .exec((err, result) => {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      return res.status(200).json(result);
  });
});

router.post("/", async (req, res, next) => {
  const maxChildId = sequenceGenerator.nextId("children");
  const child = new Child({
    id: maxChildId,
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    group: req.body.group
  });

  try {
    const createdChild = await child.save();
    res.status(201).json({
      child: "Child added successfully",
      child: createdChild,
    });
  } catch (err) {
    res.status(500).json({
      child: "An error occurred",
      error: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const child = await Child.findOne({ id: req.params.id });
    child.name = req.body.name;
    child.description = req.body.description;
    child.url = req.body.url;
    child.group = req.body.group;

    try {
      const result = await Child.updateOne({ id: req.params.id }, child);
      res.status(204).json({
        child: "Child updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        child: "An error occurred",
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      child: "Child not found.",
      error: { child: "Child not found" },
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const child = await Child.findOne({ id: req.params.id });

    try {
      const result = await Child.deleteOne({ id: req.params.id });
      res.status(204).json({
        child: "Child deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        child: "An error occurred",
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      child: "Child not found.",
      error: { child: "Child not found" },
    });
  }
});

module.exports = router;
