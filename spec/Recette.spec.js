import Recette from "../src/models/RecetteModel.js";

describe("Recette tests", () => {
  let recetteId = null;

  it("can be created", async () => {
    const recette = {
      titre: "crepe",
      type: "dessert",
      ingredients: "farine",
      categorie_id: 2,
    };
    const result = await Recette.createRecette(
      recette.titre,
      recette.type,
      recette.ingredients,
      recette.categorie_id
    );

    recetteId = result.insertId;
    expect(result).not.toBe(null);
  });

  it("can be updated", async () => {
    const updatedRecette = {
      titre: "gâteau",
      type: "dessert",
      ingredients: "farine, sucre",
      categorie_id: 2,
    };

    const updateResult = await Recette.updateRecette(
      recetteId,
      updatedRecette.titre,
      updatedRecette.type,
      updatedRecette.ingredients,
      updatedRecette.categorie_id
    );

    expect(updateResult.affectedRows).toBe(1);
  });

  it("fails to update a recipe that does not exist", async () => {
    const invalidId = 999999;
    const updatedRecette = {
      titre: "fake gâteau",
      type: "dessert",
      ingredients: "farine, sucre",
      categorie_id: 1,
    };

    const updateResult = await Recette.updateRecette(
      invalidId,
      updatedRecette.titre,
      updatedRecette.type,
      updatedRecette.ingredients,
      updatedRecette.categorie_id
    );

    expect(updateResult.affectedRows).toBe(0);
  });

  it("can get all recipes", async () => {
    const allRecettes = await Recette.getAllRecettes();

    expect(allRecettes).not.toBeNull();
    expect(allRecettes.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await Recette.deleteRecette(recetteId);

    expect(result.affectedRows).toEqual(1);
  });

  it("fails to delete a recipe that does not exist", async () => {
    const invalidId = 999999;
    const deleteResult = await Recette.deleteRecette(invalidId);

    expect(deleteResult.affectedRows).toBe(0);
  });
});
