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
        res.status(200).json({
          status: 200,
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

// @route POST api/v1/items
// @desc Add new item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    count: req.body.count
  });
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/v1/items/:id
// @desc Remove item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
