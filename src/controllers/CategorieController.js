import CategorieModel from "../models/CategorieModel.js";


export default class CategorieController {
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await CategorieModel.getById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Categorie non trouvée" });
      }
      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }

  static async getCategories(req, res, next) {
    try {
      const results = await CategorieModel.getAllcategories();
      res.json(results);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async createCategorie(req, res, next) {
    try {
      const { nom } = req.body;
      await CategorieModel.createCategorie(nom);
      res.status(201).json("Categorie ajoutée avec succès");
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async updateCategorie(req, res, next) {
    try {
      const id = req.params.id;
      const { nom } = req.body;
      await CategorieModel.updateCategorie(id, nom);
      res.json("Categorie mise à jour avec succès");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }

  static async deleteCategorie(req, res, next) {
    try {
      const { id } = req.params;
      await CategorieModel.deleteCategorie(id);
      res.json({ message: "Categorie supprimée avec succès" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }
}
