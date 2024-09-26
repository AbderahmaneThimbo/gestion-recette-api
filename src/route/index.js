import { Router } from "express";
import RecetteController from "../controllers/RecetteController.js";
import CategorieController from "../controllers/CategorieController.js";
import { addRequestValidator, updateRequestValidator, deleteRequestValidator } from "../validators/RecetteValidator.js";
import { addCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../validators/CategorieValidator.js";



const router = Router();

router.get("/recettes", RecetteController.getRecettes);
router.get("/categories",  CategorieController.getCategories);

router.post("/recettes", addRequestValidator, RecetteController.createRecette);
router.post("/categories",  addCategoryValidator, CategorieController.createCategorie);

router.put(
  "/recettes/:id",
  updateRequestValidator,
  RecetteController.updateRecette
);

router.put(
  "/categories/:id",
  updateCategoryValidator,
  CategorieController.updateCategorie
);

router.delete(
  "/recettes/:id",
  deleteRequestValidator,
  RecetteController.deleteRecette
);

router.delete(
  "/categories/:id",
  deleteCategoryValidator,
  CategorieController.deleteCategorie
);

export default router;
