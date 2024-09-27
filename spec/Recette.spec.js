import Recette from "../src/models/RecetteModel.js";


describe("Recette tests", () => {
  let recetteId = null;

  it("can be created", async () => {
    const recette = { titre: "crepe", type: "dessert", ingredients: "farine", categorie_id: 1 };
    const result = await Recette.createRecette(
      recette.titre,
      recette.type,
      recette.ingredients,
      recette.categorie_id,
    );

    recetteId = result.insertId;
    expect(result).toEqual(true);
  });

  it("can be updated", async () => {
    const updatedRecette = {
      titre: "gâteau",
      type: "dessert",
      ingrédients: "farine, sucre",
    };

    const updateResult = await Recette.updateRecette(
      18,
      updatedRecette.titre,
      updatedRecette.type,
      updatedRecette.ingrédients,
      updatedRecette.categorie_id
    );

    expect(updateResult).toBe(true); 
  });

  it("can get all recipes", async () => {
    const allRecettes = await Recette.getAllRecettes();

    expect(allRecettes).not.toBeNull();
    expect(allRecettes.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await Recette.deleteRecette(17);

    expect(result.affectedRows).toEqual(1);
  });
});
