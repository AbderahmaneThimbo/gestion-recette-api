import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import CategorieModel from "../models/CategorieModel.js";

const addCategoryValidator = [
  check("nom")
    .not()
    .isEmpty()
    .withMessage("Nom est oblgatoire")
    .bail()

    .isLength({ max: 100 })
    .withMessage("Maximun 100 caractère requis!")
    .bail()

    .custom(async (value) => {
      const result = await CategorieModel.checkCategorie(value);
      if (result !== 0) {
        console.log("Deux categorie ne peuvent pas avoir même nom!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id est requis!")
    .bail()
    .custom(async (value) => {
      const result = await CategorieModel.getById(value);
      if (result === 0) {
        throw new Error("Cette categorie n'existe pas!");
      }
      return true;
    }),
  check("nom")
    .notEmpty()
    .withMessage("Nom ne doit pas être vide")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Maximum 100 caractères requis!")
    .bail()
    .custom(async (value) => {
      const result = await CategorieModel.checkCategorie(value);
      if (result !== 0) {
        throw new Error("Cette categorie existe déjà!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteCategoryValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id est obligatoire !")
    .bail()
    .custom(async (value) => {
      const result = await CategorieModel.getById(value);
      if (result == 0) {
        throw new Error("Cette categorie n'existe pas!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
