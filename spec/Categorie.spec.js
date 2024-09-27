import Categorie from "../src/models/CategorieModel.js";

describe("Categorie tests", () => {
  let categorieId = null;

  it("can be created", async () => {
    const categorie = { nom: "crepe" };
    const result = await Categorie.createCategorie(categorie.nom);

    categorieId = result.insertId;
    expect(result).not.toBe(null);
  });

  it("can be updated", async () => {
    const updatedCategorie = {
      nom: "gâteau",
    };

    const updateResult = await Categorie.updateCategorie(
      categorieId,
      updatedCategorie.nom,
    );

    expect(updateResult.affectedRows).toBe(1);
  });

  it("fails to update a category that does not exist", async () => {
    const invalidId = 999999;
    const updatedRecette = {
      nom: "gâteau",
    };

    const updateResult = await Categorie.updateCategorie(
      invalidId,
      updatedRecette.nom,
    );

    expect(updateResult.affectedRows).toBe(0);
  });

  it("can get all category", async () => {
    const allCategories = await Categorie.getAllcategories();

    expect(allCategories).not.toBeNull();
    expect(allCategories.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await Categorie.deleteCategorie(categorieId);

    expect(result.affectedRows).toEqual(1);
  });

  it("fails to delete a category that does not exist", async () => {
    const invalidId = 999999;
    const deleteResult = await Categorie.deleteCategorie(invalidId);

    expect(deleteResult.affectedRows).toBe(0);
  });
});
