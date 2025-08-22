import pool from "../config/db.js";

const seed = async () => {
  try {
    console.log("🌱 Seeding database with bookstore data...");

    // Clear old data
    await pool.query("TRUNCATE items, categories RESTART IDENTITY CASCADE;");

    // Insert categories
    const categories = await pool.query(
      `INSERT INTO categories (name, description) VALUES
        ('Fiction', 'Novels and short stories'),
        ('Non-Fiction', 'Biographies, history, and educational books'),
        ('Science & Technology', 'Books on science, programming, and technology')
      RETURNING id;`
    );

    // Insert items (books)
    await pool.query(
      `INSERT INTO items (name, description, quantity, price, category_id) VALUES
        ('The Great Gatsby', 'A classic novel by F. Scott Fitzgerald', 12, 10.99, $1),
        ('To Kill a Mockingbird', 'Harper Lee’s Pulitzer Prize-winning novel', 8, 12.50, $1),
        ('Sapiens: A Brief History of Humankind', 'By Yuval Noah Harari', 10, 18.99, $2),
        ('Educated', 'A memoir by Tara Westover', 5, 15.75, $2),
        ('Clean Code', 'Programming best practices by Robert C. Martin', 6, 35.50, $3),
        ('Introduction to Algorithms', 'The CLRS bible for algorithms', 3, 75.00, $3);`,
      [categories.rows[0].id, categories.rows[1].id, categories.rows[2].id]
    );

    console.log("✅ Bookstore data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seed();
