import RecetteModel from "../models/RecetteModel.js";

export default class RecetteController {
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await RecetteModel.getById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Recette non trouvée" });
      }
      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }

  static async getRecettes(req, res, next) {
    try {
      const results = await RecetteModel.getAllRecettes();
      res.json(results);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async createRecette(req, res, next) {
    try {
      const { titre, type, ingredients,  categorie_id } = req.body;
      await RecetteModel.createRecette(titre, type, ingredients,  categorie_id);
      res.status(201).json("Recette ajoutée avec succès");
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async updateRecette(req, res, next) {
    try {
      const id = req.params.id;
      const { titre, type, ingredients,  categorie_id } = req.body;
      await RecetteModel.updateRecette(id, titre, type, ingredients,  categorie_id);
      res.json("Recette mise à jour avec succès");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }

  static async deleteRecette(req, res, next) {
    try {
      const { id } = req.params;
      await RecetteModel.deleteRecette(id);
      res.json({ message: "Recette supprimée avec succès" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    next();
  }
}
