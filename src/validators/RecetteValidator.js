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

    .isLength({ min: 5, max: 100  })
    .withMessage("Le titre doit contenir entre 5 et 100 caractères!")
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
    .isLength({ min: 10, max: 500 })
    .withMessage("Les ingrédients doivent contenir entre 10 et 500 caractères")
    .bail(),
  
  check("type")
    .notEmpty()
    .withMessage("Type ne peut pas être vide!")
    .bail()
    .isIn(["Entrée", "Plat", "Dessert"])
    .withMessage('Le type doit être "Entrée", "Plat" ou "Dessert"')
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
    .isLength({min: 5, max: 100})
    .withMessage("Le titre doit contenir entre 5 et 100 caractères")
    .bail()
    .custom(async (value) => {
      const result = await RecetteModel.checkRecette(value);
      if (result > 1) {
        throw new Error("Cette recette existe déjà!");
      }
      return true;
    }),
  
  check("ingredients")
    .notEmpty()
    .withMessage("Ingredients ne peut pas être vide!")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage("Les ingrédients doivent contenir entre 10 et 500 caractères")
    .bail(),
  
  check("type")
    .notEmpty()
    .withMessage("Type ne peut pas être vide!")
    .bail()
    .isIn(["Entrée", "Plat", "Dessert"])
    .withMessage('Le type doit être "Entrée", "Plat" ou "Dessert"')
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
