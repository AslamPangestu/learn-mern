const express = require("express"); //import express
const router = express.Router(); //get class router from express

//Import Item Model
const Item = require("../../models/Item");

// @route GET api/v1/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      if (items.length === 0) {
        res.status(204).json({
          status: 204,
          message: "Items is Empty"
        });
      } else if (items === undefined) {
        res.status(404).json({
          status: 404,
          message: "Items not found"
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Success get all items",
          data: items
        });
      }
    });
});

// @route GET api/v1/items/:id
// @desc Get Specific item by id
// @access Public
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      res.status(200).json({
        status: 200,
        message: `Succes get data ${req.params.id}`,
        data: item,
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed get data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

// @route GET api/v1/items/:id
// @desc Get Specific item by id
// @access Public
router.get("/", (req, res) => {
  Item.findOne({ name: req.query.name })
    .then(item =>
      res.status(200).json({
        status: 200,
        message: `Succes get data ${req.params.name}`,
        data: item,
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed get data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

// @route POST api/v1/items
// @desc Add new item
// @access Public
router.post("/", (req, res) => {
  if (req.body.name === "") {
    res.status(400).json({
      status: 400,
      message: "Name is empty",
      success: false
    });
  } else if (req.body.count === "") {
    res.status(400).json({
      status: 400,
      message: "Count is empty",
      success: false
    });
  } else {
    const newItem = new Item({
      name: req.body.name,
      count: parseInt(req.body.count)
    });
    newItem.save().then(item =>
      res.status(200).json({
        status: 200,
        message: "Succes add new item",
        data: item,
        success: true
      })
    );
  }
});

// @route DELETE api/v1/items/:id
// @desc Remove item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() =>
        res.status(200).json({
          status: 200,
          message: `Succes remove data ${req.params.id}`,
          success: true
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        status: 404,
        message: `Failed remove data ${req.params.id}. ${err}`,
        success: false
      })
    );
});

module.exports = router;
