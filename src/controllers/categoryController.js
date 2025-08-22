// src/controllers/categoryController.js
import Category from "../models/category.js";
import Item from "../models/Item.js";

class CategoryController {
  // Show all categories
  static async list(req, res) {
    try {
      const categories = await Category.getAll();
      res.render("categories/index", { categories });
    } catch (err) {
      res.status(500).send("Error loading categories");
    }
  }

  // Show a single category + its items
  static async detail(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.getById(id);
      const items = await Item.getByCategory(id);
      res.render("categories/detail", { category, items });
    } catch (err) {
      res.status(500).send("Error loading category details");
    }
  }

  // Show form to create new category
  static async createForm(req, res) {
    res.render("categories/create");
  }

  // Handle new category submission
  static async create(req, res) {
    try {
      const { name, description } = req.body;
      await Category.create({ name, description });
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Error creating category");
    }
  }

  // Show form to edit category
  static async editForm(req, res) {
    try {
      const category = await Category.getById(req.params.id);
      res.render("categories/edit", { category });
    } catch (err) {
      res.status(500).send("Error loading edit form");
    }
  }

  // Handle category update
  static async update(req, res) {
    try {
      const { name, description } = req.body;
      await Category.update(req.params.id, { name, description });
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Error updating category");
    }
  }

  // Delete category
  static async delete(req, res) {
    try {
      await Category.delete(req.params.id);
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Error deleting category");
    }
  }
}

export default CategoryController;
