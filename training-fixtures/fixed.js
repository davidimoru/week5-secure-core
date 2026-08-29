const DEMO_API_KEY = process.env.DEMO_API_KEY;

app.get("/api/search", async (req, res) => {
  const term = req.query.q;
  const query =
    "SELECT id, name FROM products WHERE name LIKE $1";
  const rows = await db.query(query, [`%${term}%`]);
  res.json({ results: rows });
});
