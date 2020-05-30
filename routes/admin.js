const express = require("express");
const { check } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    check("title")
      .isString()
      .isLength({ max: 25, min: 5 })
      .withMessage("Please enter a valid Title!!"),
    check("imageUrl").isURL().withMessage("Please enter a valid URL!!"),
    check("price").isNumeric().withMessage("Please enter a valid amount"),
    check("description")
      .isString()
      .isLength({ max: 250, min: 20 })
      .withMessage(
        "Description should be atleast 20 chars and not more than 250 chars"
      ),
  ],
  isAuth,

  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    check("title")
      .isString()
      .isLength({ max: 25, min: 5 })
      .withMessage("Please enter a valid Title!!"),
    check("imageUrl").isURL().withMessage("Please enter a valid URL!!"),
    check("price").isNumeric().withMessage("Please enter a valid amount"),
    check("description")
      .isString()
      .isLength({ max: 250, min: 20 })
      .withMessage(
        "Description should be atleast 20 chars and not more than 250 chars"
      ),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
