import express from "express";
import {
  createItemForm,
  createItem,
  editItemForm,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/items/new", createItemForm);
router.post("/items", createItem);
router.get("/items/:id/edit", editItemForm);
router.post("/items/:id/update", updateItem);
router.post("/items/:id/delete", deleteItem);

export default router;
