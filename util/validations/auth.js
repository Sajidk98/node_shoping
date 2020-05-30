const { check, body } = require("express-validator/check");
const User = require('../../models/user')

exports.signUpValidation = [
  check("email")
    .isEmail()
    .withMessage("please enter a valid email!")
    .custom((value, { req }) => {
      //custom validation
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("User already exists!!");
        }
      });
    })
    .normalizeEmail(),
  body(
    //we can use check also instead of body
    "password",
    "please enter a valid password which contains alphanumaric and atleast 5 chars!!"
  )
    .isLength({ min: 5, max: 10 })
    .isAlphanumeric()
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password should match to confirm password!");
      } else {
        return true;
      }
    })
    .trim(),
];

exports.loginValidation = [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email to login!")
      .normalizeEmail(),
    body(
      //we can use check also instead of body
      "password",
      "please enter a valid password which contains alphanumaric and atleast 5 chars!!"
    )
      .isLength({ min: 5, max: 10 })
      .isAlphanumeric()
      .trim(),
  ]
