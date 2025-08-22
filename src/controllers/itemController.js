
import Item from "../models/Item.js";
import Category from "../models/category.js";

class ItemController {
  // Show all items
  static async list(req, res) {
    try {
      const items = await Item.getAll();
      res.render("items/index", { items });
    } catch (err) {
      res.status(500).send("Error loading items");
    }
  }

  // Show single item
  static async detail(req, res) {
    try {
      const item = await Item.getById(req.params.id);
      res.render("items/detail", { item });
    } catch (err) {
      res.status(500).send("Error loading item");
    }
  }

  // Show form to create new item
  static async createForm(req, res) {
    try {
      const categories = await Category.getAll(); // dropdown for categories
      res.render("items/create", { categories });
    } catch (err) {
      res.status(500).send("Error loading create form");
    }
  }

  // Handle new item submission
  static async create(req, res) {
    try {
      const { name, description, quantity, price, category_id } = req.body;
      await Item.create({ name, description, quantity, price, category_id });
      res.redirect("/items");
    } catch (err) {
      res.status(500).send("Error creating item");
    }
  }

  // Show form to edit item
  static async editForm(req, res) {
    try {
      const item = await Item.getById(req.params.id);
      const categories = await Category.getAll();
      res.render("items/edit", { item, categories });
    } catch (err) {
      res.status(500).send("Error loading edit form");
    }
  }

  // Handle item update
  static async update(req, res) {
    try {
      const { name, description, quantity, price, category_id } = req.body;
      await Item.update(req.params.id, { name, description, quantity, price, category_id });
      res.redirect("/items");
    } catch (err) {
      res.status(500).send("Error updating item");
    }
  }

  // Delete item
  static async delete(req, res) {
    try {
      await Item.delete(req.params.id);
      res.redirect("/items");
    } catch (err) {
      res.status(500).send("Error deleting item");
    }
  }
}

export default ItemController;
