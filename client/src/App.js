import { useState, useEffect } from "react";

function ZoneBadge({ zone }) {
  return <span className={`zone-badge zone-${zone}`}>{zone}</span>;
}

function Card({ item, onClick }) {
  return (
    <div className="card" onClick={() => onClick(item)}>
      <div className="pincode">{item.pincode}</div>
      <div className="area">{item.area}</div>
      <div className="locality">{item.locality}</div>
      <ZoneBadge zone={item.zone} />
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{item.pincode}</h2>
        <div className="modal-area">{item.area}</div>
        <br />
        <div className="modal-row"><span>Locality</span><span>{item.locality}</span></div>
        <div className="modal-row"><span>Zone</span><span><ZoneBadge zone={item.zone} /></span></div>
        <div className="modal-row"><span>City</span><span>Bangalore, Karnataka</span></div>
        <div className="modal-row"><span>Country</span><span>India</span></div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

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

      {!loading && results.length > 0 && (
        <div className="stats">{results.length} result{results.length !== 1 ? "s" : ""}</div>
      )}

      {loading ? (
        <div className="empty">Loading…</div>
      ) : results.length === 0 ? (
        <div className="empty">No results found.</div>
      ) : (
        <div className="results-grid">
          {results.map((item) => (
            <Card key={item.pincode} item={item} onClick={setSelected} />
          ))}
        </div>
      )}

      <Modal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
