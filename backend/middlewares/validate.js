import { check } from "express-validator/check";

const validate = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage("Name is required!!!")
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage("User name not use unique key"),

    check("email")
      .notEmpty()
      .withMessage("email is required")
      .custom((val) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val))
      .isEmail(),

    check("country")
      .notEmpty()
      .withMessage("Country is required")
      .isLength({ min: 3 }),

    check("language").notEmpty().withMessage("Language is required"),
  ];
};

module.exports = validate;
