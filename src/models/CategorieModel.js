import { pool } from "../db/db.js";

export default class CategorieModel {
  static async getById(id) {
    const con = await pool.getConnection();
    const [result] = await con.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id],
    );

    return result.length;
  }

  static async getAllcategories() {
    const connection = await pool.getConnection();
    const sql = "SELECT * FROM categories";
    try {
      const [results] = await connection.execute(sql);
      connection.release();
      return results;
    } catch (e) {
      connection.release();
      throw new Error(e.message);
    }
  }

  static async createCategorie(nom) {
    const connection = await pool.getConnection();
    const sql = "INSERT INTO categories (nom) VALUES (?)";
    await connection.execute(sql, [nom]);
    return true;
  }

  static async updateCategorie(id, nom) {
    const connection = await pool.getConnection();
    const sql = "UPDATE categories SET nom = ? WHERE id = ?";
    await connection.execute(sql, [nom, id]);
    return true;
  }

  static async deleteCategorie(id) {
    const connection = await pool.getConnection();
    try {
      const sql = "DELETE FROM categories WHERE id = ?";
      const [result] = await connection.execute(sql, [id]);
      connection.release();
      return result;
    } catch (e) {
      connection.release();
      throw new Error(e.message);
    }
  }

  static async checkCategorie(nom) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT * FROM categories WHERE nom = ?",
      [nom],
    );
    return result.length;
  }
}
