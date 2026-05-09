const express = require("express");
const cors = require("cors");
const pincodes = require("./data/pincodes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/all", (req, res) => res.json(pincodes));

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  if (!q) return res.json([]);
  const results = pincodes.filter(
    (p) =>
      p.pincode.includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.locality.toLowerCase().includes(q)
  );
  res.json(results.slice(0, 20));
});

app.get("/api/pincode/:code", (req, res) => {
  const result = pincodes.find((p) => p.pincode === req.params.code);
  if (!result) return res.status(404).json({ error: "Pincode not found" });
  res.json(result);
});

app.get("/api/zones", (req, res) => {
  const zones = [...new Set(pincodes.map((p) => p.zone))].sort();
  res.json(zones);
});

app.get("/api/zone/:zone", (req, res) => {
  const results = pincodes.filter(
    (p) => p.zone.toLowerCase() === req.params.zone.toLowerCase()
  );
  res.json(results);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
