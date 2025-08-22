import pool from "../config/db.js";

class Category {
  //get all categories
  static async getAll() {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    return result.rows;
  }
  // get one category by ID
  static async getById(id) {
    const result = await pool.query("SELECT * FROM categories WHERE id=$1", [id]);
    return result.rows[0];
  }
  // create a new category
  static async create({ name, description }) {
    const result = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return result.rows[0];
  }
  // update a category
  static async update(id, { name, description }) {
    const result = await pool.query(
      "UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [name, description, id]
    );
    return result.rows[0];
  }
  //delete a category
  static async delete(id) {
    await pool.query("DELETE FROM categories WHERE id=$1", [id]);
    return { message: "Category deleted" };
  }
}

export default Category;
