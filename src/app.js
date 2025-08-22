import express from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); // for forms
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/", categoryRoutes);
app.use("/", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
