const express = require("express");
const cors = require("cors");
const pincodes = require("./data/pincodes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/all", (req, res) => res.json(pincodes));

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
  if (q.length < 2) return res.status(400).json({ error: "Query must be at least 2 characters" });

  const results = pincodes.filter(
    (p) =>
      p.pincode.includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.locality.toLowerCase().includes(q)
  );
  res.json(results.slice(0, 20));
});

app.get("/api/pincode/:code", (req, res) => {
  const { code } = req.params;
  if (!/^\d{6}$/.test(code)) return res.status(400).json({ error: "Pincode must be a 6-digit number" });
  const result = pincodes.find((p) => p.pincode === code);
  if (!result) return res.status(404).json({ error: `Pincode ${code} not found` });
  res.json(result);
});

app.get("/api/zones", (req, res) => {
  const zones = [...new Set(pincodes.map((p) => p.zone))].sort();
  res.json(zones);
});

app.get("/api/zone/:zone", (req, res) => {
  const validZones = ["Central", "North", "South", "East", "West"];
  const zone = req.params.zone;
  if (!validZones.includes(zone)) {
    return res.status(400).json({ error: `Invalid zone. Valid zones: ${validZones.join(", ")}` });
  }
  res.json(pincodes.filter((p) => p.zone === zone));
});

// 404 for unknown routes
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
