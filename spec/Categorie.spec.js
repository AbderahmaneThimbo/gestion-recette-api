import Categorie from "../src/models/CategorieModel.js";

describe("Categorie tests", () => {
  let categorieId = null;

  it("can be created", async () => {
    const categorie = { nom: "crepe"};
    const result = await Categorie.createCategorie(
      categorie.titre
    );

    categorieId = result.insertId;
    expect(result).toEqual(true);
  });

  it("can be updated", async () => {
    const updatedCategorie = {
      nom: "gâteau",
    };

    const updateResult = await Categorie.updateCategorie(
      4,
      updatedCategorie.titre,
    );

    expect(updateResult).toBe(true); 
  });

  it("can get all category", async () => {
    const allCategories = await Categorie.getAllcategories();

    expect(allCategories).not.toBeNull();
    expect(allCategories.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await Categorie.deleteCategorie(5);

    expect(result.affectedRows).toEqual(1);
  });
});