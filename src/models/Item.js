import pool from "../config/db.js";

class Item {
  // Get all items
  static async getAll() {
    const result = await pool.query(
      `SELECT items.*, categories.name AS category_name
       FROM items
       JOIN categories ON items.category_id = categories.id
       ORDER BY items.id`
    );
    return result.rows;
  }

  // Get items by category
  static async getByCategory(categoryId) {
    const result = await pool.query(
      `SELECT items.*, categories.name AS category_name
       FROM items
       JOIN categories ON items.category_id = categories.id
       WHERE category_id = $1
       ORDER BY items.id`,
      [categoryId]
    );
    return result.rows;
  }

  // Get single item by ID
  static async getById(id) {
    const result = await pool.query(
      `SELECT items.*, categories.name AS category_name
       FROM items
       JOIN categories ON items.category_id = categories.id
       WHERE items.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Create new item
  static async create({ name, description, quantity, price, category_id }) {
    const result = await pool.query(
      `INSERT INTO items (name, description, quantity, price, category_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, quantity, price, category_id]
    );
    return result.rows[0];
  }

  // Update item
  static async update(id, { name, description, quantity, price, category_id }) {
    const result = await pool.query(
      `UPDATE items
       SET name = $1, description = $2, quantity = $3, price = $4, category_id = $5
       WHERE id = $6
       RETURNING *`,
      [name, description, quantity, price, category_id, id]
    );
    return result.rows[0];
  }

  // Delete item
  static async delete(id) {
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
    return { message: "Item deleted" };
  }
}

export default Item;
