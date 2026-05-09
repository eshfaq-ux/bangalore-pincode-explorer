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
        <hr className="modal-divider" />
        <div className="modal-row"><span>Locality</span><span>{item.locality}</span></div>
        <div className="modal-row"><span>Zone</span><span><ZoneBadge zone={item.zone} /></span></div>
        <div className="modal-row"><span>City</span><span>Bangalore, Karnataka</span></div>
        <div className="modal-row"><span>Country</span><span>India</span></div>
      </div>
    </div>
  );
}

async function apiFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    apiFetch("/api/zones").then(setZones).catch(() => {});
    load("/api/all");
  }, []);

  const load = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(url);
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    const q = query.trim();
    if (!q) return load("/api/all");
    if (q.length < 2) { setError("Enter at least 2 characters"); return; }
    setActiveZone("All");
    load(`/api/search?q=${encodeURIComponent(q)}`);
  };

  const filterByZone = (zone) => {
    setActiveZone(zone);
    setQuery("");
    load(zone === "All" ? "/api/all" : `/api/zone/${zone}`);
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
          onChange={(e) => { setQuery(e.target.value); setError(null); }}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button onClick={search}>Search</button>
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}

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

      {!loading && !error && results.length > 0 && (
        <div className="stats">{results.length} result{results.length !== 1 ? "s" : ""}</div>
      )}

      {loading ? (
        <div className="empty">Loading…</div>
      ) : !error && results.length === 0 ? (
        <div className="empty">No results found.</div>
      ) : !error ? (
        <div className="results-grid">
          {results.map((item) => (
            <Card key={item.pincode} item={item} onClick={setSelected} />
          ))}
        </div>
      ) : null}

      <Modal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
