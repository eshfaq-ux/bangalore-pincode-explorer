import { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/zones").then((r) => r.json()).then(setZones).catch(() => {});
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const data = await fetch("/api/all").then((r) => r.json()).catch(() => []);
    setResults(data);
    setLoading(false);
  };

  const search = async (q) => {
    setLoading(true);
    setActiveZone("All");
    const url = q.trim() ? `/api/search?q=${encodeURIComponent(q)}` : "/api/all";
    const data = await fetch(url).then((r) => r.json()).catch(() => []);
    setResults(data);
    setLoading(false);
  };

  const filterByZone = async (zone) => {
    setActiveZone(zone);
    setQuery("");
    setLoading(true);
    const url = zone === "All" ? "/api/all" : `/api/zone/${zone}`;
    const data = await fetch(url).then((r) => r.json()).catch(() => []);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <header>
        <h1>📍 Bangalore Pincode Explorer</h1>
        <p>Search pincodes and area names across Bangalore</p>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter pincode (560001) or area (Koramangala)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(query)}
        />
        <button onClick={() => search(query)}>Search</button>
      </div>

      <div className="tabs">
        {["All", ...zones].map((z) => (
          <button
            key={z}
            className={`tab ${activeZone === z ? "active" : ""}`}
            onClick={() => filterByZone(z)}
          >
            {z}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="empty">Loading…</div>
      ) : results.length === 0 ? (
        <div className="empty">No results found.</div>
      ) : (
        <div className="stats">{results.length} result{results.length !== 1 ? "s" : ""}</div>
      )}
    </div>
  );
}
