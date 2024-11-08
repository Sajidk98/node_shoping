const { check } = require("express-validator/check");

exports.addProduct = [
  check("title")
    .isString()
    .isLength({ max: 25, min: 5 })
    .withMessage("Please enter a valid Title!!"),
  check("price").isNumeric().withMessage("Please enter a valid amount"),
  check("description")
    .isString()
    .isLength({ max: 250, min: 5 })
    .withMessage(
      "Description should be atleast 20 chars and not more than 250 chars"
    ),
];
