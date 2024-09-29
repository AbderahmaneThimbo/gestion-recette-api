import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import RecetteModel from "../models/RecetteModel.js";
import CategorieModel from "../models/CategorieModel.js";

const addRequestValidator = [
  check("titre")
    .not()
    .isEmpty()
    .withMessage("Titre est oblgatoire")
    .bail()

    .isLength({ min: 3 })
    .withMessage("Minimun 3 caractère requis!")
    .bail()

    .custom(async (value) => {
      const result = await RecetteModel.checkRecette(value);
      if (result !== 0) {
        throw new Error("Deux recettes ne peuvent pas avoir même titre!");
      }
      return true;
    }),
  check("ingredients")
    .notEmpty()
    .withMessage("Ingredients ne peut pas être vide!")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Entre 1 et 50 caractères!")
    .bail(),
  check("type")
    .notEmpty()
    .withMessage("Type ne peut pas être vide!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 4 caractères requis!")
    .bail(),
  check("categorie_id")
    .notEmpty()
    .withMessage("L'id du categorie  est requis!")
    .bail()
    .custom(async (value) => {
      const idRecetteExist = await CategorieModel.getById(value);

      if (idRecetteExist === 0) {
        throw new Error("L'id du categorie n'existe pas!");
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

const updateRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id est requis!")
    .bail()
    .custom(async (value) => {
      const result = await RecetteModel.getById(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  check("titre")
    .notEmpty()
    .withMessage("Titre ne doit pas être vide")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 2 caractères requis!")
    .bail()
    .custom(async (value) => {
      const result = await RecetteModel.checkRecette(value);
      if (result !== 0) {
        throw new Error("Cette recette existe déjà!");
      }
      return true;
    }),
  check("ingredients")
    .notEmpty()
    .withMessage("Ingredients ne peut pas être vide!")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Entre 2 et 50 caractères!")
    .bail(),
  check("type")
    .notEmpty()
    .withMessage("Type ne peut pas être vide!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 4 caractères requis!")
    .bail(),
  check("categorie_id")
    .notEmpty()
    .withMessage("L'id du categorie  est requis!")
    .bail()
    .custom(async (value) => {
      const idRecetteExist = await CategorieModel.getById(value);

      if (idRecetteExist === 0) {
        throw new Error("L'id du categorie n'existe pas!");
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
const deleteRequestValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id est obligatoire !")
    .bail()
    .custom(async (value) => {
      const result = await RecetteModel.getById(value);
      if (result == 0) {
        throw new Error("Cette recette n'existe pas!");
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

export { addRequestValidator, updateRequestValidator, deleteRequestValidator };
