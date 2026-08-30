const express = require("express");
const app = express();

const DEMO_API_KEY = "demo-api-key-123456";

app.get("/api/search", async (req, res) => {
    const term = req.query.q;
    const query = `SELECT id, name FROM products WHERE name LIKE '%${term}%'`;
    const rows = await db.query(query);

    res.json({ results: rows });
});
